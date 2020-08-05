import { RouterState } from 'connected-react-router';
import { IUser } from './user/user';

export interface IAppState {
  router: RouterState;
  user: IUser;
}
