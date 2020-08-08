import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
<<<<<<< HEAD
  deleteAccountRoutine,
=======
>>>>>>> 2d40902638f6ffb2cd4d520712246d735d105b9c
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines/user';
import { IUser } from '../common/models/user/user';

export interface IUserState {
  isLoading: boolean;
  isAuthorized: boolean;
  data: IUser | null;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false,
  data: null
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
<<<<<<< HEAD
    case deleteAccountRoutine.TRIGGER: {
      return { ...state, isLoading: true };
    }
    case deleteAccountRoutine.SUCCESS: {
      return { isAuthorized: false, isLoading: false };
    }
    case deleteAccountRoutine.FAILURE: {
      return { ...state, isLoading: false };
    }
=======
>>>>>>> 2d40902638f6ffb2cd4d520712246d735d105b9c
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
<<<<<<< HEAD
=======
    case fetchUserRoutine.FAILURE:
    case addNewUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
>>>>>>> 2d40902638f6ffb2cd4d520712246d735d105b9c
    default:
      return state;
  }
};

export default reducer;
