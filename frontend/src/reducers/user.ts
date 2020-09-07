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
  setInvitedUserRoutine,
  loginWithGoogleRoutine,
  loginWithFacebookRoutine,
  updateAvatarRoutine,
  updateAudioRoutine
} from 'routines/user';
import { IUser } from 'common/models/user/IUser';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { addWorkspaceRoutine } from 'scenes/Workspace/routines';
import { addInviteWorkspaceRoutine } from 'containers/JoinInvitedWorkspace/routines';

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

const reducer = (state = initialState, { type, payload }: Routine<any>): IUserState => {
  switch (type) {
    case addNewUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case addInviteWorkspaceRoutine.SUCCESS:
    case addNewUserRoutine.SUCCESS:
    case fetchUserRoutine.SUCCESS:
    case loginUserRoutine.SUCCESS:
    case loginWithGoogleRoutine.SUCCESS:
    case loginWithFacebookRoutine.SUCCESS: {
      const {
        id,
        incomingSoundOptions,
        fullName,
        displayName,
        email,
        imageUrl,
        title,
        githubUsername,
        workspaces,
        status,
        audio
      } = payload;
      return {
        ...state,
        user: {
          id,
          fullName,
          displayName,
          email,
          imageUrl,
          title,
          githubUsername,
          status,
          audio,
          incomingSoundOptions
        },
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
      return state;
    }
    case editProfileRoutine.SUCCESS: {
      return { ...state, user: { ...payload } };
    }
    case editProfileRoutine.FAILURE: {
      return state;
    }
    case deleteAccountRoutine.TRIGGER:
      return { ...state, isLoading: true };
    case deleteAccountRoutine.SUCCESS:
      return { ...state, isAuthorized: false, isLoading: false };
    case deleteAccountRoutine.FAILURE:
      return { ...state, isLoading: false };

    case loginUserRoutine.TRIGGER:
    case loginWithGoogleRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loginUserRoutine.FAILURE:
    case loginWithGoogleRoutine.FAILURE:
    case loginWithFacebookRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case forgotPasswordRoutine.SUCCESS: {
      return { ...state, isLoading: false };
    }
    case forgotPasswordRoutine.FAILURE: {
      return { ...state, isLoading: false };
    }
    case forgotPasswordRoutine.TRIGGER: {
      return { ...state, isLoading: true };
    }
    case resetPasswordRoutine.TRIGGER: {
      return { ...state, isLoading: true };
    }
    case resetPasswordRoutine.SUCCESS: {
      return { ...state, isLoading: false };
    }
    case resetPasswordRoutine.FAILURE: {
      return { ...state, isLoading: false };
    }
    case editStatusRoutine.TRIGGER: {
      return state;
    }
    case editStatusRoutine.SUCCESS: {
      if (state.user) {
        return { ...state, user: { ...state.user, status: payload } };
      }
      return state;
    }
    case editStatusRoutine.FAILURE: {
      return state;
    }
    case addWorkspaceRoutine.SUCCESS: {
      const workspaces = [...state.workspaceList];
      workspaces.push(payload);
      return { ...state, isLoading: false, workspaceList: workspaces };
    }
    case addWorkspaceRoutine.FAILURE: {
      return { ...state, isLoading: false };
    }
    case setInvitedUserRoutine.TRIGGER: {
      return {
        ...state,
        invitedUserEmail: payload.invitedUserEmail,
        invitedUserRegistered: payload.invitedUserRegistered
      };
    }

    case updateAvatarRoutine.SUCCESS:
      return {
        ...state,
        user: { ...state.user as IUser, imageUrl: payload }
      };
    case updateAudioRoutine.SUCCESS:
      return {
        ...state,
        user: { ...state.user as IUser, audio: payload }
      };
    default:
      return state;
  }
};

export default reducer;
