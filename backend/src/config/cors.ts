import { env } from '../env';

export const ScheduliaIntegrationOptions = {
  origin: (origin: any, callback: (err: Error, isAllowed?: boolean) => any) => {
    if (env.cors.scheduliaWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
