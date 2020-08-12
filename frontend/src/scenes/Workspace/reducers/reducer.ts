import { Routine } from 'redux-saga-routines';
import {
  addWorkspaceRoutine,
  selectChatRoutine,
  setActiveThreadRoutine,
  fetchPostCommentsRoutine
} from '../routines/routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: any;
  selectedChat: any;
  channels: Array<any>;
  directMessages: Array<any>;
  activeThread: any;
}

const initialState: IWorkspaceState = {
  workspace: {},
  loading: false,
  error: '',
  selectedChat: null,
  channels: [],
  directMessages: [],
  activeThread: {}
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
    case setActiveThreadRoutine.TRIGGER:
      return {
        ...state,
        activeThread: { post: payload }
      };
    case fetchPostCommentsRoutine.SUCCESS:
      return {
        ...state,
        activeThread: { ...state.activeThread, comments: payload }
      };
    default:
      return state;
  }
};

export default workspace;
