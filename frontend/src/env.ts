<<<<<<< HEAD
import { getOsEnv } from '@helpers/pathHelper';
=======
import { getOsEnv } from 'common/helpers/pathHelper';
>>>>>>> 19207a7

export const env = {
  urls: {
    server: getOsEnv('REACT_APP_SERVER')
  },
  apiKeys: {
    textEditor: getOsEnv('REACT_APP_TEXT_EDITOR_API_KEY')
  }
};
