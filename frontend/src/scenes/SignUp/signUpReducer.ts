import { ADD_NEW_USER } from "./actionTypes";

const reducer = (state: { users: object[] } = { users: []}, action: { user: object, type: string } ) => {
  if(action.type === ADD_NEW_USER) {
    const newUser = action.user;
    return {
      ...state,
      users: { ...state.users, newUser }
    };
  }
  else return state;
}
