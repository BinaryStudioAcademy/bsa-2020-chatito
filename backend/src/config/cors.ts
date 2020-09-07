const whitelist = ['http://dev.schedulia.xyz', 'dev.schedulia.xyz'];
export const ScheduliaIntegrationOptions = {
  origin: (origin: any, callback: (err: Error, isAllowed?: boolean) => any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
