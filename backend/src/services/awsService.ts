import { s3, bucket, signedUrlExpireSeconds } from '../config/awsConfig';
import { ISignS3 } from '../common/models/aws/ISignS3';

export const signS3 = (fileName: string): Promise<ISignS3> => {
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
