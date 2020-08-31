import { getOsEnv } from 'common/helpers/pathHelper';

export const env = {
  urls: {
    server: getOsEnv('REACT_APP_SERVER'),
    aws: getOsEnv('REACT_APP_AWS_URL')
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
  }
};
