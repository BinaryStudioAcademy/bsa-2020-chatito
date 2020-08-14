import { env } from 'env';

export const googleAuthConfig = {
  clientId: env.googleAuth.clientId,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ')
};
