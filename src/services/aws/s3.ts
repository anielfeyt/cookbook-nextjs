"use server";

import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createClient } from "../supabase/client";

export async function listBuckets() {
  const client = new S3Client({
    forcePathStyle: true,
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_BUCKET_URL,
    credentials: {
      accessKeyId: process.env.RESEPTE_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.RESEPTE_AWS_SECRET_ACCESS_KEY as string,
    },
  });

  try {
    const command = new ListBucketsCommand();
    const data = await client.send(command);
    console.log(data);
  } catch (err) {
    const { requestId, cfId, extendedRequestId } = err.$metadata;
    console.error(err);
    console.log({ requestId, cfId, extendedRequestId });
  }
}

export async function uploadS3File(filePath: string, file: File) {
  const client = new S3Client({
    forcePathStyle: true,
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_BUCKET_URL,
    credentials: {
      accessKeyId: process.env.BUKCET_ACCESS_KEY as string,
      secretAccessKey: process.env.BUCKET_SECRET_KEY as string,
    },
  });

  try {
    const base64data = await file.arrayBuffer();
    const streamBody = new Uint8Array(base64data);

    const command = new PutObjectCommand({
      Bucket: `content.cookbook`,
      Key: filePath,
      Body: streamBody,
      ContentType: "image/jpeg",
    });
    await client.send(command);

    console.log("File uploaded");
    return { message: "File uploaded", status: 201 };
  } catch (err) {
    console.error("Upload error", err);
  }
}
