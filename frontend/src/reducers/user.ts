import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  loginUserRoutine,
  deleteAccountRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines/user';
import { IUser } from '@models/user/IUser';

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false
};

const reducer = (state = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addNewUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case addNewUserRoutine.SUCCESS:
      return {
        ...state,
        data: { ...payload },
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
    case fetchUserRoutine.SUCCESS:
      return {
        ...state,
        data: { ...payload },
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
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
      return { ...state, loading: false, data: { ...payload } };
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
    case loginUserRoutine.SUCCESS:
      return {
        ...state,
        data: { ...payload },
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
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
    default:
      return state;
  }
};

export default reducer;
