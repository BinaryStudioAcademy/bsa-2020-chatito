import * as dotenv from 'dotenv';
import { getOsEnv } from './common/utils/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('APP_SERVER_PORT'),
    secret: getOsEnv('SECRET_KEY'),
    sendgrid: getOsEnv('SENDGRID_API_KEY'),
    client: getOsEnv('APP_CLIENT_URL')
  },
  mail: {
    mail: getOsEnv('NODEMAILER_MAIL'),
    password: getOsEnv('NODEMAIL_PASS')
  },
  googleAuth: {
    clientId: getOsEnv('GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: getOsEnv('GOOGLE_AUTH_CLIENT_SECRET')
  },
  facebookAuth: {
    appId: getOsEnv('FACEBOOK_LOGIN_APP_ID'),
    appSecret: getOsEnv('FACEBOOK_LOGIN_APP_SECRET')
  }
};
