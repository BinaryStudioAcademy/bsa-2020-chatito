import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, editProfileRoutine, addNewUserRoutine } from '../routines/user';
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
    case editProfileRoutine.TRIGGER: {
      return { ...state, loading: true };
    }
    case editProfileRoutine.SUCCESS: {
      return { ...state, loading: false };
    }
    case editProfileRoutine.FAILURE: {
      return { ...state, loading: false };
    }
    case fetchUserRoutine.FAILURE:
    case addNewUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    default:
      return state;
  }
};

export default reducer;
