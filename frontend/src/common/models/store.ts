import { RouterState } from 'connected-react-router';
import { IEditProfileState } from '../../containers/EditProfile/reducer';
import { IUserState } from './user/user';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  editUserProfile: IEditProfileState
}
