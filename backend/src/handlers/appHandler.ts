import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middlewares.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "../lib/s3Client.js";
import { CourseBasicInfo, sectionUploadType } from "../types/types.js";
import { createLecture, getSections, updateLecture } from "../lib/utilities.js";

const appHandler = Router();

appHandler.post("/edit/:courseId/info", async (req: AuthRequest, res) => {
  try {
    let course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
    });

    const courseInfo = CourseBasicInfo.safeParse(req.body);
    if (!courseInfo.success) {
      res.status(400);
      let errors: Record<string, string> = {};
      courseInfo.error.issues.forEach((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      return res.json({ error: errors });
    }
    if (!course) {
      // create course with that id
      course = await prisma.course.create({
        data: {
          id: req.params.courseId,
          title: courseInfo.data.title,
          description: courseInfo.data.description,
          price: courseInfo.data.price,
          catergory: courseInfo.data.catergory,
          status: "DRAFT",
          instructorId: req.user.id,
        },
      });
      const command = new PutObjectCommand({
        Bucket: "production",
        Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
      });
      const url = await getSignedUrl(s3client, command);
      return res.json({ thumbnailUpload: url, sections: [] });
    }

    if (course.instructorId === req.user.id) {
      // instructor is updating
      course = await prisma.course.update({
        where: { id: course.id },
        data: {
          title: courseInfo.data.title,
          catergory: courseInfo.data.catergory,
          description: courseInfo.data.description,
          price: courseInfo.data.price,
        },
      });
      if (courseInfo.data.thumbnail) {
        const command = new PutObjectCommand({
          Bucket: "production",
          Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
        });
        const url = await getSignedUrl(s3client, command);
        return res.json({
          thumbnailUpload: url,
          sections: getSections(course.id),
        });
      }
      return res.json({ sections: getSections(course.id) });
    }
    // unauthorised
    return res.sendStatus(401);
  } catch (error) {
    console.error("GOT AN ERROR: ", error);
    return res.sendStatus(500);
  }
});

// assumption: request is only made for those lec that are to be updated
appHandler.post("/edit/:courseId/sections", async (req: AuthRequest, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
    });
    if (!course) {
      return res.sendStatus(422);
    }
    let doUserHasPermissionForCourse = req.user.id === course.instructorId;
    if (!doUserHasPermissionForCourse) {
      return res.sendStatus(401);
    }
    const sections = sectionUploadType.safeParse(req.body);
    if (!sections.success) {
      return res.sendStatus(400);
    }
    let dataToSend: {
      sections: {
        sectionId: string;
        lectures: { lectureId: string; url?: string }[];
      }[];
    } = { sections: [] };

    sections.data.Sections.forEach(async (sectionFromUser) => {
      let Lectures: { lectureId: string; url: string }[] = [];
      let sectionFromDB = await prisma.section.findUnique({
        where: { id: sectionFromUser.id, courseId: course.id },
      });

      // section doesn't exist
      if (!sectionFromDB) {
        sectionFromDB = await prisma.section.create({
          data: {
            title: sectionFromUser.title,
            courseId: course.id,
            id: sectionFromUser.id,
          },
        });
      }

      // section exist
      sectionFromUser.lectures.forEach(async (lectureFromUser) => {
        let lectureFromDB = await prisma.lecture.findUnique({
          where: { id: lectureFromUser.id, sectionID: sectionFromDB.id },
        });
        if (lectureFromDB) {
          // lecture already exist
          let isLectureInfoChanged =
            !(lectureFromUser.title === lectureFromDB.title) ||
            !(lectureFromUser.description === lectureFromDB.description) ||
            !(lectureFromUser.duration === lectureFromDB.duration);
          let lecture = await updateLecture(
            lectureFromUser,
            sectionFromDB,
            course.instructorId,
            isLectureInfoChanged
          );
          if (lecture) {
            Lectures.push(lecture);
          }
        } else {
          let lecture = await createLecture(
            lectureFromUser,
            sectionFromDB,
            course.instructorId
          );
          Lectures.push(lecture);
        }
      });
      dataToSend["sections"].push({
        sectionId: sectionFromUser.id,
        lectures: Lectures,
      });
    });
    return res.json(dataToSend);
  } catch (error) {
    console.error("GOT AN ERROR: ", error);
    return res.sendStatus(500);
  }
});

export { appHandler };
