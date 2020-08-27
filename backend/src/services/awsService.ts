import { v4 } from 'uuid';
import { s3, bucket, signedUrlExpireSeconds, region, allowedFileTypes } from '../config/awsConfig';
import { ISignS3 } from '../common/models/aws/ISignS3';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';

export const signS3 = (fileType: string): Promise<ISignS3> => {
  console.log(fileType);
  if (!allowedFileTypes.includes(fileType)) {
    throw new CustomError(
      400,
      'Forbidden file type. Only .png, .jpg and .jpeg are allowed.',
      ErrorCode.ForbiddenFileType
    );
  }

  const fileName = v4();

  const s3Params = {
    Bucket: bucket,
    Key: `avatars/${fileName}`,
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
        url: `https://${bucket}.s3.${region}.amazonaws.com/avatars/${fileName}`,
        fileName
      };

      resolve(returnData);
    });
  });
};
