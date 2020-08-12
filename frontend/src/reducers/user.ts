import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  loginUserRoutine,
  deleteAccountRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine,
  editStatusRoutine,
  setInvitedUserRoutine
} from 'routines/user';
import { IUser } from 'common/models/user/IUser';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { addWorkspaceRoutine } from 'scenes/Workspace/routines';

export interface IUserState {
  user?: IUser;
  invitedUserEmail?: string;
  invitedUserRegistered?: boolean;
  isLoading: boolean;
  isAuthorized: boolean;
  workspaceList: IWorkspace[];
}

const initialState: IUserState = {
  invitedUserEmail: '',
  invitedUserRegistered: undefined,
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
    case loginUserRoutine.SUCCESS: {
      const { id, fullName, email, imageUrl, title, workspaces } = payload;

      return {
        ...state,
        user: { id, fullName, email, imageUrl, title },
        workspaceList: workspaces,
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
      };
    }
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
      return { ...state, loading: false, user: { ...state.user, status: payload } };
    }
    case editStatusRoutine.FAILURE: {
      return { ...state, loading: false };
    }
    case addWorkspaceRoutine.SUCCESS: {
      const workspaces = [...state.workspaceList];
      workspaces.push(payload);
      return { ...state, loading: false, workspaceList: workspaces };
    }
    case addWorkspaceRoutine.FAILURE: {
      return { ...state, loading: false };
    }

    case setInvitedUserRoutine.TRIGGER: {
      return {
        ...state,
        invitedUserEmail: payload.invitedUserEmail,
        invitedUserRegistered: payload.invitedUserRegistered };
    }

    default:
      return state;
  }
};

export default reducer;
