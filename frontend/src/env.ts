import { getOsEnv } from './common/helpers/pathHelper';

export const env = {
  urls: {
    server: getOsEnv('REACT_APP_SERVER')
  }
};
