import { Routine } from 'redux-saga-routines';
import { addNewUserRoutine, fetchUserRoutine } from '../routines/user';
import { IUserState } from '../common/models/user/user';

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
