import { RouterState } from 'connected-react-router';
import { IModalState } from '../../reducers/modal';
import { IUserState } from '../../reducers/user';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
}
