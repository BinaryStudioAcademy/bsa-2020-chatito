import { s3, bucket, signedUrlExpireSeconds } from '../config/awsConfig';
import { ISignS3 } from '../common/models/aws/ISignS3';

export const signS3 = (userId: string): Promise<ISignS3> => {
  const fileName = `${userId}-${Date.now()}`;
  const s3Params = {
    Bucket: bucket,
    Key: `avatars/${fileName}`,
    Expires: signedUrlExpireSeconds,
    ContentType: 'jpeg',
    ACL: 'bucket-owner-full-control'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        reject(err);
      }

      const returnData = {
        signedRequest: data,
        fileName
      };

      resolve(returnData);
    });
  });
};

export const deleteAvatar = (imageUrl: string) => {
  const fileName = imageUrl.slice(imageUrl.lastIndexOf('/') + 1);
  const s3Params = {
    Bucket: bucket,
    Key: `avatars/${fileName}`
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
