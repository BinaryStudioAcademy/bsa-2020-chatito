import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, selectChatRoutine, addChatRoutine } from '../routines/routines';
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
    case addChatRoutine.TRIGGER:
      return {
        ...state, chat: payload, loading: true
      };
    case addChatRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    case addChatRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default workspace;
