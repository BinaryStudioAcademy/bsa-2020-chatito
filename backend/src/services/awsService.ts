import { URL } from 'url';
import { s3, bucket, signedUrlExpireSeconds, AWSUrl } from '../config/awsConfig';
import { ISignS3 } from '../common/models/aws/ISignS3';

export const signS3 = (userId: string, folder: string, fileType: string): Promise<ISignS3> => {
  const fileName = `${userId}-${Date.now()}`;
  const s3Params = {
    Bucket: bucket,
    Key: `${folder}/${fileName}`,
    Expires: signedUrlExpireSeconds,
    ContentType: fileType,
    ACL: 'bucket-owner-full-control'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        reject(err);
      }

      const returnData = {
        signedRequest: data,
        fileName,
        link: `${AWSUrl}/${folder}/${fileName}`
      };

      resolve(returnData);
    });
  });
};

export const deleteObject = (url: string) => {
  const key = new URL(url).pathname.slice(1);
  const s3Params = {
    Bucket: bucket,
    Key: key
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(s3Params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
