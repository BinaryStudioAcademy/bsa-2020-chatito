import { Routine } from 'redux-saga-routines';
import { fetchWorkspacesRoutine } from './routines';

export interface IWorkspace {
  [key: string]: string;
}

export interface IWorkspaceToolbarState {
  workspaces: IWorkspace[];
  loading: boolean;
}

const initialState = {
  workspaces: [],
  loading: false
}

const WorkspaceToolbarReducer = (state: IWorkspaceToolbarState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case fetchWorkspacesRoutine.TRIGGER:
      return {
        ...state, workspaces: payload, loading: false
      };
    case fetchWorkspacesRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchWorkspacesRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default WorkspaceToolbarReducer;
