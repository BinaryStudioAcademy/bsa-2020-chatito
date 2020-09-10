import { AWSUrl } from '../../config/awsConfig';
import { imageHost } from '../../config/facebookAuthConfig';

export const getImageUrl = (imageUrl: string) => {
  if (imageUrl.startsWith(imageHost)) {
    return imageUrl;
  }
  if (imageUrl) {
    return `${AWSUrl}${imageUrl}`;
  }
  return null;
};
