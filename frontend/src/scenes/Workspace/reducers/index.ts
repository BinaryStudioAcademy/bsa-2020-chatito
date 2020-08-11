import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, selectChatRoutine, selectWorkspaceRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '' },
  loading: false,
  error: '',
  selectedChat: { id: '', name: '', isPrivate: false },
  channels: [],
  directMessages: []
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case selectChatRoutine.TRIGGER:
      return {
        ...state,
        selectedChat: payload
      };
    case selectWorkspaceRoutine.TRIGGER: {
      return {
        ...state,
        workspace: payload
      };
    }
    case addWorkspaceRoutine.SUCCESS: {
      const addWorkspace = { ...payload };

      return {
        ...state,
        workspace: addWorkspace
      };
    }
    default:
      return state;
  }
};

export default workspace;
