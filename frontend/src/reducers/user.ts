import { Routine } from 'redux-saga-routines';

export interface IUserState {
  loading: boolean;
  isAuthorized: boolean;
}

const initialState: IUserState = {
  loading: false,
  isAuthorized: false
};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    default:
      return state;
  }
};
