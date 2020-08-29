import api from 'common/helpers/apiHelper';
import { ISignResponse } from 'common/models/aws/ISignResponse';

export const signS3 = () => (
  api.post<ISignResponse>('/api/aws/sign-s3')
);

export const uploadPhoto = (signedRequest: string, fileName: string, file: Blob) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'jpeg',
      'Content-Disposition': `attachment; filename=${fileName}`
    },
    body: file
  };

  return fetch(signedRequest, options);
};
