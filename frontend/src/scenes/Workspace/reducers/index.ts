import { Routine } from 'redux-saga-routines';
import { selectChatRoutine, selectWorkspaceRoutine, addWorkspaceRoutine } from 'scenes/Workspace/routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: any;
  selectedChat: any;
  channels: Array<any>;
  directMessages: Array<any>;
}

const initialState: IWorkspaceState = {
  workspace: {},
  loading: false,
  error: '',
  selectedChat: null,
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
        workspace: payload.workspace
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
