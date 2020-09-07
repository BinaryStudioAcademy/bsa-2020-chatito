import { userLogoDefaultUrl } from 'common/configs/defaults';

export const getUserImgLink = (imageLink: string): string => (
  imageLink
  // eslint-disable-next-line
    ? imageLink
    : userLogoDefaultUrl
);
