import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../lib/prisma.js";
import {
  createLecture,
  getSignedUrlForThumbnail,
  updateLecture,
} from "../../lib/utilities.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "../../lib/s3Client.js";
import {
  CourseInput,
  LectureInput,
  LectureUpload,
  SectionInput,
  SectionsInput,
  UploadFiles,
} from "../../types/types.js";

export default class CourseService {
  public static async getCourses() {
    try {
      return await prisma.course.findMany();
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
  public static async getCourse(courseId: string) {
    try {
      let course = await prisma.course.findUnique({
        where: { id: courseId },
      });
      if (!course) {
        throw Error("Course doesn't Exist!");
      }

      return {
        ...course,
        thumbnai: await getSignedUrlForThumbnail(
          course.thumbnail,
          course.instructorId,
          course.id
        ),
      };
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
  public static async getInstructor(instructorId: string) {
    try {
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
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
  public static async getSections(courseid: string) {
    try {
      return await prisma.section.findMany({
        where: { courseId: courseid },
      });
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
  public static async getLectures(sectionID: string) {
    try {
      return await prisma.lecture.findMany({
        where: { sectionID },
      });
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
  public static async updateBasics(payload: CourseInput, userid: string) {
    try {
      console.log(payload);
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
            catergory: payload.category,
            status: "DRAFT",
            instructorId: userid,
          },
        });
        const command = new PutObjectCommand({
          Bucket: "production",
          Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
        });
        const url = await getSignedUrl(s3client, command);
        return { courseid: course.id, url };
      }

      if (course.instructorId === userid) {
        // instructor is updating
        course = await prisma.course.update({
          where: { id: course.id },
          data: {
            title: payload.title,
            catergory: payload.category,
            description: payload.description,
            price: payload.price,
          },
        });
        if (payload.thumbnail) {
          const command = new PutObjectCommand({
            Bucket: "production",
            Key: `${course.instructorId}/${course.id}/thumnail.jpg`,
          });
          const url = await getSignedUrl(s3client, command);
          return {
            courseid: course.id,
            url,
          };
        }
        return { courseid: course.id };
      }
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
    throw Error("Unauthorised");
  }
  // assumption: request is only made for those lec that are to be updated
  public static async updateSections(userid: string, payload: SectionsInput) {
    try {
      const course = await prisma.course.findUnique({
        where: { id: payload.courseId },
      });
      if (course) {
        let doUserHasPermissionForCourse = userid === course.instructorId;
        let dataToSend: UploadFiles = { Sections: [] };

        payload.sections.forEach(async (section: SectionInput) => {
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
          section.lectures.forEach(async (lec: LectureInput) => {
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
          });

          // lectures loop ends
          dataToSend.Sections.push({
            sectionId: section.id,
            Lectures: Lectures,
          });
        });
        // section loop ends
        return { ...dataToSend };
      }
    } catch (e) {
      console.error("Got error: ", e);
      throw Error("INTERNAL SERVER ERROR");
    }
  }
}
