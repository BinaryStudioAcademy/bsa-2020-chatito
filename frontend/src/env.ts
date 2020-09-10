import { getOsEnv } from 'common/helpers/pathHelper';

export const env = {
  urls: {
    server: getOsEnv('REACT_APP_SERVER'),
    scheduliaUrl: getOsEnv('REACT_APP_SCHEDULIA_URL')
  },
  apiKeys: {
    textEditor: getOsEnv('REACT_APP_TEXT_EDITOR_API_KEY')
  },
  googleAuth: {
    clientId: getOsEnv('REACT_APP_GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: getOsEnv('REACT_APP_GOOGLE_AUTH_CLIENT_SECRET')
  },
  facebookAuth: {
    appId: getOsEnv('REACT_APP_FACEBOOK_LOGIN_APP_ID')
  },
  storage: {
    s3: getOsEnv('REACT_APP_S3_STORAGE')
  }
};
