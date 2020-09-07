import { AWSUrl } from '../../config/awsConfig';

export const getImageUrl = (imageUrl: string) => {
  if (AWSUrl === 'url') {
    return 'https://bsa-chatito-storage.s3.amazonaws.com/assets/defaultUserImage.png';
  }
  if (imageUrl) {
    return `${AWSUrl}${imageUrl}`;
  }
  return null;
};
