import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine } from '../routines';

interface IWorkspaceState {
  name: string;
  loading: boolean;
  error: any;
}

const initialState: IWorkspaceState = {
  name: '',
  loading: false,
  error: ''
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addWorkspaceRoutine.TRIGGER:
      return {
        ...state, name: payload, loading: true
      };
    case addWorkspaceRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addWorkspaceRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default workspace;
