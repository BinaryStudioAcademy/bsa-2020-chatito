import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, userChannelRoutine } from '../routines/routines';
import { IWorkspace } from '../../../common/models/workspace/IWorkspace';

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
    case userChannelRoutine.TRIGGER:
      return {
        ...state,
        selectedChat: payload
      };
    default:
      return state;
  }
};

export default workspace;
