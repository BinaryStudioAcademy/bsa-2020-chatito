import * as dotenv from 'dotenv';
import { getOsEnv } from './common/utils/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('APP_SERVER_PORT')
  }
};
