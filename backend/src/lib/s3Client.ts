import { S3Client } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
  region: "ap-south-1",
  forcePathStyle: true,
  endpoint: "http://localhost:9000",
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
  },
});
