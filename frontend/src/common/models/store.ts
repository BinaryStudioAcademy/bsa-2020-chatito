import { RouterState } from 'connected-react-router';
import { IUserState } from '../../reducers/user';
import { IModalState } from '../../reducers/modal';
import { IErrorBoundaryState } from '../../reducers/errorBoundary';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
  errorBoundary: IErrorBoundaryState;
}
