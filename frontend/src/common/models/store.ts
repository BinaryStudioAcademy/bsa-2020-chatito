import { RouterState } from 'connected-react-router';
import { IModalState } from 'reducers/modal';
import { IErrorBoundaryState } from 'reducers/errorBoundary';
import { IUserState } from 'reducers/user';
import { IWorkspaceState } from 'scenes/Workspace/reducers';
import { IChatState } from 'scenes/Chat/reducers';
import { IThreadsState } from 'containers/ThreadsContainer/reducers/reducer'

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
  workspace: IWorkspaceState;
  chat: IChatState;
  threads: IThreadsState;
  errorBoundary: IErrorBoundaryState;
}
