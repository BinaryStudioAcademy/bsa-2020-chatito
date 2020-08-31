import aws from 'aws-sdk';
import { env } from '../env';

export const { accessKeyId, secretAccessKey, bucket, url: AWSUrl, region } = env.aws;
export const signedUrlExpireSeconds = 500;

export const s3 = new aws.S3({ accessKeyId, secretAccessKey, region, signatureVersion: 'v4' });
