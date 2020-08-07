import { RouterState } from 'connected-react-router';
import { IUserState } from '../../reducers/user';
import { IModalState } from '../../reducers/modal';
import { IWorkspaceState} from '../../scenes/Workspace/reducers/reducer';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
  workspace: IWorkspaceState;
}
