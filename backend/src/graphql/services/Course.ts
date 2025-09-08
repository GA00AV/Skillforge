import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../lib/prisma.js";
import { createLecture, updateLecture } from "../../lib/utilities.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "../../lib/s3Client.js";
import {
  CourseInput,
  LectureUpload,
  SectionsInput,
  UploadFiles,
} from "../../types/types.js";

export default class CourseService {
  public static async getCourses() {
    return await prisma.course.findMany();
  }
  public static async getCourse(courseId: string) {
    return await prisma.course.findUnique({
      where: { id: courseId },
    });
  }
  public static async getInstructor(instructorId: string) {
    const user = await prisma.user.findUnique({
      where: { id: instructorId },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      profileImg: user.profileImg,
      name: user.name,
    };
  }
  public static async getSections(courseid: string) {
    return await prisma.section.findMany({
      where: { courseId: courseid },
    });
  }
  public static async getLectures(sectionID: string) {
    return await prisma.lecture.findMany({
      where: { sectionID },
    });
  }
  public static async updateBasics(payload: CourseInput, userid: string) {
    let course = await prisma.course.findUnique({
      where: { id: payload.id },
    });

    if (!course) {
      // create course with that id
      course = await prisma.course.create({
        data: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          price: payload.price,
          category: payload.category,
          status: "DRAFT",
          instructorId: userid,
          thumbnail: `${
            process.env.PUBLIC_STORAGE_URL || "http://localhost:9000"
          }/${process.env.PRODUCTION_BUCKET || "production"}/${userid}/${
            payload.id
          }/thumnail.jpg`,
        },
      });
      const command = new PutObjectCommand({
        Bucket: process.env.PRODUCTION_BUCKET || "production",
        Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
        ACL: "public-read",
      });
      let url = await getSignedUrl(s3client, command);

      return { courseid: course.id, url };
    }

    if (course.instructorId === userid) {
      // instructor is updating
      course = await prisma.course.update({
        where: { id: course.id },
        data: {
          title: payload.title,
          category: payload.category,
          description: payload.description,
          price: payload.price,
        },
      });
      if (payload.thumbnail) {
        const command = new PutObjectCommand({
          Bucket: process.env.PRODUCTION_BUCKET || "production",
          Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
          ACL: "public-read",
        });
        let url = await getSignedUrl(s3client, command);

        return {
          courseid: course.id,
          url,
        };
      }
      return { courseid: course.id };
    }

    throw Error("Unauthorised");
  }
  // assumption: request is only made for those lec that are to be updated
  public static async updateSections(userid: string, payload: SectionsInput) {
    const course = await prisma.course.findUnique({
      where: { id: payload.courseId },
    });
    if (course) {
      let doUserHasPermissionForCourse = userid === course.instructorId;
      let dataToSend: UploadFiles = { Sections: [] };
      if (doUserHasPermissionForCourse) {
        // delete deleted sections
        for (const secID of payload.deletedSections) {
          const section = await prisma.section.findUnique({
            where: { id: secID },
          });
          if (section) {
            const lecture = await prisma.lecture.findMany({
              where: { sectionID: secID },
            });
            if (lecture) {
              await prisma.lecture.deleteMany({ where: { sectionID: secID } });
            }
            await prisma.section.delete({ where: { id: secID } });
          }
        }
        // delete deleted lecture
        for (const lecID of payload.deletedLectures) {
          const lecture = await prisma.lecture.findUnique({
            where: { id: lecID },
          });
          if (lecture) {
            await prisma.lecture.delete({ where: { id: lecID } });
          }
        }
        for (const section of payload.sections) {
          let Lectures: LectureUpload[] = [];
          let sectionFromDB = await prisma.section.findUnique({
            where: { id: section.id, courseId: course.id },
          });

          // section doesn't exist
          if (!sectionFromDB) {
            sectionFromDB = await prisma.section.create({
              data: {
                title: section.title,
                courseId: course.id,
                id: section.id,
              },
            });
          }

          // section exist

          for (const lec of section.lectures) {
            let lecture = await prisma.lecture.findUnique({
              where: { id: lec.id, sectionID: sectionFromDB.id },
            });
            let data: LectureUpload | undefined;
            if (lecture) {
              // Lecture exist so update
              data = await updateLecture(
                lec,
                course.id,
                section.id,
                course.instructorId
              );
            } else {
              // Lecture don't exist --> Create
              data = await createLecture(
                lec,
                course.id,
                section.id,
                course.instructorId
              );
            }
            if (data) {
              Lectures.push(data);
            }
          }
          // lectures loop ends
          dataToSend.Sections.push({
            sectionId: section.id,
            Lectures: Lectures,
          });
        }

        // section loop ends
        return { ...dataToSend };
      } else {
        throw Error("Unauthorised");
      }
    } else {
      throw Error("Course doesn't exist");
    }
  }
}
