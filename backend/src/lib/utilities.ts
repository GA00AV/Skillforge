import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "./s3Client.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { LectureInput } from "../types/types.js";
import { prisma } from "./prisma.js";

export async function createLecture(
  lectureInput: LectureInput,
  courseid: string,
  sectionid: string,
  instructorId: string
) {
  let lecture = await prisma.lecture.create({
    data: {
      id: lectureInput.id,
      sectionID: sectionid,
      title: lectureInput.title,
      description: lectureInput.description,
      duration: lectureInput.duration,
    },
  });
  let url = await getSignedUrl(
    s3client,
    new PutObjectCommand({
      Bucket: "tempvideo",
      Key: `${instructorId}/${courseid}/${sectionid}/${lecture.title}.mp4`,
    })
  );
  return { lectureId: lecture.id, url };
}
export async function updateLecture(
  lectureInput: LectureInput,
  courseid: string,
  sectionid: string,
  instructorId: string
) {
  // lec don't exist so create it and url is needed

  await prisma.lecture.update({
    where: { id: lectureInput.id },
    data: {
      title: lectureInput.title,
      description: lectureInput.description,
      duration: lectureInput.duration,
    },
  });

  if (lectureInput.upload) {
    let url = await getSignedUrl(
      s3client,
      new PutObjectCommand({
        Bucket: "tempvideo",
        Key: `${instructorId}/${courseid}/${sectionid}/${lectureInput.title}.mp4`,
      })
    );
    return { url, lectureId: lectureInput.id };
  }
}

export async function getSignedUrlForThumbnail(
  thumnail: string | null,
  instructorId: string,
  courseid: string
) {
  if (!thumnail) {
    return null;
  }
  return await getSignedUrl(
    s3client,
    new GetObjectCommand({
      Bucket: "production",
      Key: `${instructorId}/${courseid}/thumnail.jpg`,
    })
  );
}
