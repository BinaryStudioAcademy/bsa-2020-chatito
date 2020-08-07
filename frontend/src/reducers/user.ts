import { Routine } from 'redux-saga-routines';
import { addNewUserRoutine, fetchUserRoutine, editProfileRoutine, loginUserRoutine } from '../routines/user';
import { IUser } from '../common/models/user/IUser';

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
    case fetchUserRoutine.FAILURE:
    case addNewUserRoutine.FAILURE:
    case loginUserRoutine.FAILURE:
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
