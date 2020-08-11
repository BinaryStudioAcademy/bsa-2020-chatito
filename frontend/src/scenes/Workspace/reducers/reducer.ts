import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, selectChatRoutine, selectWorkspaceRoutine } from '../routines/routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  selectedWorkspace: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
}

const emptyChat = { id: '', name: '', isPrivate: false };

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '' },
  loading: false,
  error: '',
  selectedChat: emptyChat,
  selectedWorkspace: emptyChat,
  channels: [],
  directMessages: []
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
    case selectChatRoutine.TRIGGER:
      return {
        ...state,
        selectedChat: payload
      };
    case selectWorkspaceRoutine.SUCCESS:
      return {
        ...state,
        selectedWorkspace: payload
      };
    default:
      return state;
  }
};

export default workspace;
