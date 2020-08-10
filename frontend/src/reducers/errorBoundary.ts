import { Routine } from 'redux-saga-routines';
import { setErrorRoutine } from '../routines/error';
import { ErrorInfo } from 'react';
import { logoutUserRoutine } from '../routines/user';

export interface IErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

const initialState: IErrorBoundaryState = {

};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case setErrorRoutine.TRIGGER: {
      return { ...state, ...action.payload };
    }
    case logoutUserRoutine.TRIGGER: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
