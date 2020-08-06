import { RouterState } from 'connected-react-router';
import { IUserState } from './user/user';

export interface IAppState {
  router: RouterState;
  user: IUserState;
}
