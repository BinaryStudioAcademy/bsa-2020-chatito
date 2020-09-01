import { AWSUrl } from '../../config/awsConfig';

export const getImageUrl = (imageUrl: string) => (
  imageUrl ? `${AWSUrl}${imageUrl}` : ''
);
