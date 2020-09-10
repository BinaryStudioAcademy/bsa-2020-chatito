import { AWSUrl } from '../../config/awsConfig';

const r = new RegExp('^(?:[a-z]+:)?//', 'i');

export const getImageUrl = (imageUrl: string) => {
  if (r.test(imageUrl)) {
    return imageUrl;
  }
  if (imageUrl) {
    return `${AWSUrl}${imageUrl}`;
  }
  return null;
};
