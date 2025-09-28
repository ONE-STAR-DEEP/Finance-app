import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID_SECRET
  }
});

export async function getObject(key){
    const command = new GetObjectCommand({
        Bucket: "natura-images",
        Key: `uploades/${key}`
    });
    const response = await getSignedUrl(s3Client, command);
    return response;
}


export async function putObject(key) {
    const command = new PutObjectCommand({
        Bucket: "natura-images",
        Key: `uploades/${key}`,
        ContentType: "image/jpeg", 
    });
    const response = await getSignedUrl(s3Client, command);
    return response;
}

export async function deleteObject(key) {
    const command = new DeleteObjectCommand({
        Bucket: "natura-images",
        Key: `uploades/${key}`
    });
    await s3Client.send(command);
    console.log(`Deleted object: ${key}`);
}