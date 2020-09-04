import api from 'common/helpers/apiHelper';
import { ISignResponse } from 'common/models/aws/ISignResponse';

export const signS3 = (folder: string, fileType: string) => (
  api.post<ISignResponse>('/api/aws/sign-s3', { folder, fileType })
);

export const signS3Avatar = () => (
  signS3('avatars', 'jpeg')
);

export const signS3Audio = () => (
  signS3('audios', 'mp3')
);

export const uploadOnAWS = (signedRequest: string, file: Blob, fileName: string, fileType: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': fileType
    },
    body: file
  };

  return fetch(signedRequest, options);
};

export const deleteAWSObject = (url: string) => {
  api.delete('/api/aws/delete', { url });
};
