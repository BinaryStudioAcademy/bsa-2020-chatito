import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  loginUserRoutine,
  deleteAccountRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine,
  fetchWorkspacesRoutine,
  editStatusRoutine
} from '../routines/user';
import { IUser } from '../common/models/user/IUser';
import { IWorkspace } from '../common/models/workspace/IWorkspace';
export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
  workspaceList: IWorkspace[];
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false,
  workspaceList: []
};

const reducer = (state = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addNewUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case addNewUserRoutine.SUCCESS:
    case fetchUserRoutine.SUCCESS:
    case loginUserRoutine.SUCCESS:
      const { id, fullName, email, imageUrl, title, workspaces } = payload;

      return {
        ...state,
        user: { id, fullName, email, imageUrl, title },
        workspaceList: workspaces,
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
      };
    case addNewUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case fetchUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case editProfileRoutine.TRIGGER: {
      return { ...state, loading: true };
    }
    case editProfileRoutine.SUCCESS: {
      return { ...state, loading: false, user: { ...payload } };
    }
    case editProfileRoutine.FAILURE: {
      return { ...state, loading: false };
    }
    case deleteAccountRoutine.TRIGGER:
      return { ...state, isLoading: true };
    case deleteAccountRoutine.SUCCESS:
      return { isAuthorized: false, isLoading: false };
    case deleteAccountRoutine.FAILURE:
      return { ...state, isLoading: false };
    case loginUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loginUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case forgotPasswordRoutine.SUCCESS: {
      return { ...state, loading: false };
    }
    case forgotPasswordRoutine.FAILURE: {
      return { ...state, loading: false };
    }
    case forgotPasswordRoutine.TRIGGER: {
      return { ...state, loading: true };
    }
    case resetPasswordRoutine.TRIGGER: {
      return { ...state, loading: true };
    }
    case resetPasswordRoutine.SUCCESS: {
      return { ...state, loading: false };
    }
    case resetPasswordRoutine.FAILURE: {
      return { ...state, loading: false };
    }
    case editStatusRoutine.TRIGGER: {
      return { ...state, loading: true };
    }
    case editStatusRoutine.SUCCESS: {
      console.log(payload.response);
      return { ...state, loading: false, user: { ...state.user, status: payload } };
    }
    case editStatusRoutine.FAILURE: {
      return { ...state, loading: false };
    }

    case fetchWorkspacesRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchWorkspacesRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case fetchWorkspacesRoutine.SUCCESS:
      return {
        ...state,
        workspaceList: payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
