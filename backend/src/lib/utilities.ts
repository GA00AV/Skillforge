import { Section, Lecture } from "@prisma/client";
import { prisma } from "./prisma.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "./s3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { LectureFromUser } from "../types/types.js";

export async function getSections(courseid: string) {
  const sectionsFromDB = await prisma.section.findMany({
    where: { courseId: courseid },
  });
  let sections: { id: string; title: string; lectures: Lecture[] }[] = [];
  if (sectionsFromDB) {
    sectionsFromDB.forEach(async (section) => {
      let lectures = await prisma.lecture.findMany({
        where: { sectionID: section.id },
      });
      sections.push({
        id: section.id,
        title: section.title,
        lectures,
      });
    });
  }
  return sections;
}

export async function createLecture(
  lectureFromUser: LectureFromUser,
  sectionFromDB: Section,
  instructorId: string
) {
  let lectureFromDB = await prisma.lecture.create({
    data: {
      id: lectureFromUser.id,
      sectionID: sectionFromDB.id,
      title: lectureFromUser.title,
      description: lectureFromUser.description,
      duration: lectureFromUser.duration,
    },
  });
  let url = await getSignedUrl(
    s3client,
    new PutObjectCommand({
      Bucket: "tempvideo",
      Key: `${instructorId}/${sectionFromDB.courseId}/${sectionFromDB.id}/${lectureFromDB.title}.mp4`,
    })
  );
  return { lectureId: lectureFromDB.id, url };
}
export async function updateLecture(
  lectureFromUser: LectureFromUser,
  sectionFromDB: Section,
  instructorId: string,
  isLectureInfoChanged: boolean
) {
  // lec don't exist so create it and url is needed
  if (isLectureInfoChanged) {
    await prisma.lecture.update({
      where: { id: lectureFromUser.id },
      data: {
        title: lectureFromUser.title,
        description: lectureFromUser.description,
        duration: lectureFromUser.duration,
      },
    });
  }
  if (lectureFromUser.upload) {
    let url = await getSignedUrl(
      s3client,
      new PutObjectCommand({
        Bucket: "tempvideo",
        Key: `${instructorId}/${sectionFromDB.courseId}/${sectionFromDB.id}/${lectureFromUser.title}.mp4`,
      })
    );
    return { url, lectureId: lectureFromUser.id };
  }
}
