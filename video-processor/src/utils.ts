import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import Ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { s3client } from "./lib/s3Client";
import { Readable } from "stream";
import { prisma } from "./lib/prisma";

// 854:480
export function transcodeVideo(
  filename: string,
  outputFilename: string,
  scale: string
) {
  // convert it to 480p
  return new Promise((resolve, reject) => {
    Ffmpeg(filename)
      .videoFilters(`scale=${scale}`)
      .videoCodec("libx264")
      .audioCodec("aac")
      .save(outputFilename)
      .on("start", () =>
        console.log(`Started converting ${filename} into ${outputFilename}`)
      )
      .on("progress", (p: any) =>
        console.log(`Processing: ${p.percent?.toFixed(2)}%`)
      )
      .on("error", (err: any) => reject(`❌ Error: ${err.message}`))
      .on("end", () => resolve(`✅ Converted video to ${scale}`))
      .run();
  });
}
// output/720p
export function convertVideoToSegments(filename: string, foldername: string) {
  return new Promise((resolve, reject) => {
    Ffmpeg(filename)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        "-hls_time 10",
        "-hls_playlist_type vod",
        `-hls_segment_filename ${foldername}/segment%03d.ts`,
        "-start_number 0",
      ])
      .save(`${foldername}/index.m3u8`)
      .on("start", () =>
        console.log(`Started converting ${filename} into segments`)
      )
      .on("progress", (p: any) =>
        console.log(`Processing: ${p.percent?.toFixed(2)}%`)
      )
      .on("error", (err: any) => reject(`❌ Error: ${err.message}`))
      .on("end", (data) => {
        console.log(data);
        resolve(`✅ Converted ${filename} to segments!`);
      })
      .run();
  });
}

export function createMasterVideoFile(folder: string) {
  const masterContent = `
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=854x480
480p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
720p/index.m3u8
`;

  if (fs.existsSync(folder)) {
    fs.writeFileSync(`${folder}/master.m3u8`, masterContent);
  } else {
    console.error("folder doesn't exist!");
  }
}

export async function processMessage(
  key: string,
  bucket: string,
  outputBucket: string,
  instructor: string,
  courseid: string,
  sectionid: string,
  lectureid: string,
  storageServerUrl: string
) {
  const getCommand = new GetObjectCommand({
    Key: key,
    Bucket: bucket,
  });
  try {
    // downoad video file
    let data = await s3client.send(getCommand);
    if (data.Body instanceof Readable) {
      const inputFilename = "input.mp4";
      const outputFilename480 = "output480.mp4";
      const outputFilename720 = "output720.mp4";
      let writeStream = fs.createWriteStream(inputFilename);
      data.Body.pipe(writeStream);
      await new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
          writeStream.close();
          return resolve("done");
        });
        writeStream.on("error", reject);
      });

      // transcode video
      await transcodeVideo(inputFilename, outputFilename480, "854:480");
      await transcodeVideo(inputFilename, outputFilename720, "1280:720");

      // check folder exists
      if (!fs.existsSync("output")) {
        fs.mkdirSync("output");
        fs.mkdirSync("output/720p");
        fs.mkdirSync("output/480p");
      }
      // create segments and master index
      await convertVideoToSegments(outputFilename480, "output/480p");
      await convertVideoToSegments(outputFilename720, "output/720p");
      createMasterVideoFile("output");

      // upload files to server
      const files = fs.readdirSync("output", { withFileTypes: true });
      for (const file of files) {
        if (file.isFile()) {
          console.log(
            `Uploading ${instructor}/${courseid}/${sectionid}/${lectureid}/${file.name}`
          );
          await s3client.send(
            new PutObjectCommand({
              Bucket: outputBucket,
              Key: `${instructor}/${courseid}/${sectionid}/${lectureid}/${file.name}`,
              Body: fs.readFileSync(`output/${file.name}`),
            })
          );
          console.log("uploaded");
        } else {
          const innerFiles = fs.readdirSync(`output/${file.name}`, {
            withFileTypes: true,
          });
          for (const innerfile of innerFiles) {
            console.log(
              `${instructor}/${courseid}/${sectionid}/${lectureid}/${file.name}/${innerfile.name}`
            );
            await s3client.send(
              new PutObjectCommand({
                Bucket: outputBucket,
                Key: `${instructor}/${courseid}/${sectionid}/${lectureid}/${file.name}/${innerfile.name}`,
                Body: fs.readFileSync(`output/${file.name}/${innerfile.name}`),
              })
            );
            console.log("uploaded");
          }
        }
      }

      // update src in database
      console.log("finding lec for updating");
      let lecture = await prisma.lecture.findUnique({
        where: { id: lectureid },
      });
      if (lecture) {
        console.log("found lecture");
        await prisma.lecture.update({
          where: { id: lecture.id },
          data: {
            src: `${storageServerUrl}/${outputBucket}/${instructor}/${courseid}/${sectionid}/${lectureid}/master.m3u8`,
          },
        });
        console.log("updated prisma");
      }

      // clean up
      fs.rmSync("output", { recursive: true, force: true });
      console.log("deleted output folder");
    } else {
      console.error("video isn't found! or not instance of Readable!");
    }
  } catch (error) {
    console.error(error);
  }
}
