import { IWorkspaceState } from 'scenes/Workspace/reducers';
import { fetchWorkspaceUsersRoutine } from '../routines/index';
import { Routine } from 'redux-saga-routines';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  channels: [],
  directMessages: [],
  users: [],
  showRightSideMenu: RightMenuTypes.None,
  activeThread: null,
  userProfile: { id: '', email: '', fullName: '', displayName: '' }
};

const ThreadsReducer = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case fetchWorkspaceUsersRoutine.TRIGGER:
      return {
        ...state, users: { payload }, loading: true
      };
    case fetchWorkspaceUsersRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchWorkspaceUsersRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default ThreadsReducer;
