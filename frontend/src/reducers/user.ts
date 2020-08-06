import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, editProfile } from '../routines/user';
import { IUser } from '../common/models/user/user';

export interface IUserState {
  isLoading: boolean;
  isAuthorized: boolean;
  data?: IUser;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false
};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchUserRoutine.SUCCESS:
      const { payload } = action;
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
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
    default:
      return state;
  }
};
