import { Routine } from 'redux-saga-routines';
import { addNewUserRoutine, fetchUserRoutine } from '../routines/user';

export interface IUserInitState {
  isLoading: boolean;
  isAuthorized: boolean;
}

const initialState: IUserInitState = {
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
        ...payload,
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
        ...payload,
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
      };
    default:
      return state;
  }
};

export default reducer;
