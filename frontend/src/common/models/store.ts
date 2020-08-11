import { RouterState } from 'connected-react-router';
import { IModalState } from 'reducers/modal';
import { IErrorBoundaryState } from 'reducers/errorBoundary';
import { IUserState } from 'reducers/user';
import { IWorkspaceState } from 'scenes/Workspace/reducers/reducer';
import { IChatState } from 'reducers/channel';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
  workspace: IWorkspaceState;
  chat: IChatState;
  errorBoundary: IErrorBoundaryState;
}
