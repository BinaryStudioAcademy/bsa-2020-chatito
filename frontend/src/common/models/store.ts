import { IUserState } from '../../reducers/user';
import { RouterState } from 'connected-react-router';

export interface IAppState {
  router: RouterState;
  user: IUserState;
}
