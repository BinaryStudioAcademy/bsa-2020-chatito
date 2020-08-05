import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine } from '../routines/user';

export interface IUserState {
  isLoading: boolean;
  isAuthorized: boolean;
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
    default:
      return state;
  }
};
