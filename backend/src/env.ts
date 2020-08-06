import * as dotenv from 'dotenv';
import { getOsEnv } from './common/utils/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('APP_SERVER_PORT'),
    secret: getOsEnv('SECRET_KEY'),
    sendgrid: getOsEnv('SENDGRID_API_KEY'),
    mail: getOsEnv('SENDGRID_MAIL')
  }
};
