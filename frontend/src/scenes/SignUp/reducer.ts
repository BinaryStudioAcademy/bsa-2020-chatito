import { Routine } from 'redux-saga-routines';
import { addNewUserRoutine } from './routines';

const initialState = {
  users: []
};
const reducer = ( state = initialState, { type, payload }: Routine<any> ) => {
  switch (type) {
    case addNewUserRoutine.SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          payload
        ]
      }
    default:
      return state;
  }
};

export default reducer;
