import { Routine } from 'redux-saga-routines';
<<<<<<< HEAD
import { addWorkspaceRoutine, userChannelRoutine } from '../routines';
import { IChat } from '../../../common/models/workstate/chat';

export interface IWorkspaceState {
  name: string;
  loading: boolean;
  error: any;
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
=======
import { addWorkspaceRoutine } from '../routines/routines';
import { IWorkspace } from '../../../common/models/workspace/IWorkspace';

interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: any;
  selectedChat: any;
  channels: Array<any>;
  directMessages: Array<any>;
>>>>>>> f7b9ce56ca6bfc53823261c076674fdb50d1d6cd
}

const initialState: IWorkspaceState = {
  workspace: {},
  loading: false,
  error: '',
<<<<<<< HEAD
  channels: [],
  directMessages: [],
  selectedChat: { id: '', channelName: '', isPrivate: false }
=======
  selectedChat: null,
  channels: [],
  directMessages: []
>>>>>>> f7b9ce56ca6bfc53823261c076674fdb50d1d6cd
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addWorkspaceRoutine.TRIGGER:
      return {
        ...state, workspace: payload, loading: true
      };
    case addWorkspaceRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addWorkspaceRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    case userChannelRoutine.SUCCESS:
      return {
        ...state,
        selectedChat: payload
      };
    default:
      return state;
  }
};

export default workspace;
