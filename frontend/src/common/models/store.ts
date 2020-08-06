import { RouterState } from 'connected-react-router';
import { IUserState } from './user/IUserState';

export interface IAppState {
  router: RouterState;
  user: IUserState;
}
