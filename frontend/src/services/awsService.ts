import api from 'common/helpers/apiHelper';
import { ISignResponse } from 'common/models/aws/ISignResponse';

export const signS3 = (fileType: string) => (
  api.post<ISignResponse>('/api/aws/sign-s3', { fileType })
);

export const uploadPhoto = (signedRequest: string, fileName: string, fileType: string, file: File) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': fileType,
      'Content-Disposition': `attachment; filename=${fileName}`
    },
    body: file
  };

  return fetch(signedRequest, options);
};
