import { RouterState } from 'connected-react-router';
import { IModalState } from 'reducers/modal';
import { IErrorBoundaryState } from 'reducers/errorBoundary';
import { IUserState } from 'reducers/user';
import { IWorkspaceState } from 'scenes/Workspace/reducers';
import { IChatState } from 'scenes/Chat/reducers';
import { IThreadsState } from 'containers/ThreadsContainer/reducers/reducer'
<<<<<<< HEAD
import { IDraftState } from 'scenes/Drafts/reducer';
=======
import { IJoinInvitedWorkspaceState } from 'containers/JoinInvitedWorkspace/reducer';
>>>>>>> 5bdf91d528b762e011abf9dc553aac668195fb61

export interface IAppState {
  router: RouterState;
  user: IUserState;
  modal: IModalState;
  workspace: IWorkspaceState;
  chat: IChatState;
  threads: IThreadsState;
  errorBoundary: IErrorBoundaryState;
<<<<<<< HEAD
  drafts: IDraftState;
=======
  inviteWorkspace: IJoinInvitedWorkspaceState;
>>>>>>> 5bdf91d528b762e011abf9dc553aac668195fb61
}
