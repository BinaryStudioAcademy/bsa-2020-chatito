import aws from 'aws-sdk';
import { env } from '../env';

export const { accessKeyId, secretAccessKey, bucket } = env.aws;
export const signedUrlExpireSeconds = 500;
export const region = 'eu-central-1';

export const s3 = new aws.S3({ accessKeyId, secretAccessKey, region, signatureVersion: 'v4' });

export const allowedFileTypes = ['jpg', 'png', 'jpeg'];
