import { Routine } from 'redux-saga-routines';

export default (state = {}, action:Routine<any>) => {
  switch (action.type) {
    default:
      return state;
  }
};
