import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, editProfile, deleteAccountRoutine, addNewUserRoutine } from '../routines/user';
import { IUser, IUserState } from '../common/models/user/user';

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
    case editProfile.TRIGGER: {
      return { ...state, loading: true };
    }
    case editProfile.SUCCESS: {
      return { ...state, loading: false };
    }
    case editProfile.FAILURE: {
      return { ...state, loading: false };
    }
    case deleteAccountRoutine.TRIGGER: {
      return { ...state, isLoading: true };
    }
    case deleteAccountRoutine.SUCCESS: {
      return { isAuthorized: false, isLoading: false };
    }
    case deleteAccountRoutine.FAILURE: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};

export default reducer;
