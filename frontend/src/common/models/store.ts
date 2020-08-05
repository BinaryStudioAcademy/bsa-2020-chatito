import { IUserState } from '../../reducers/user';
import { RouterState } from 'connected-react-router';
import { IEditProfileState } from '../../containers/EditProfile/reducer';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  editUserProfile: IEditProfileState
}
