import { RouterState } from 'connected-react-router';
import { IUserState } from '../../reducers/user';
import { IModalState } from '../../reducers/modal';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
}
