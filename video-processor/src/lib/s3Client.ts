import { S3Client } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
  region: "ap-south-1",
  forcePathStyle: true,
  endpoint: process.env.STORAGE_SERVER || "http://localhost:9000",
  credentials: {
    accessKeyId: process.env.STORAGE_ID || "minioadmin",
    secretAccessKey: process.env.STORAGE_PASSWORD || "minioadmin",
  },
});
