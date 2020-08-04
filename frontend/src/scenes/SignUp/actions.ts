import { ADD_NEW_USER } from './actionTypes';

const addNewUserAction = (userData: object) => ({
  type: ADD_NEW_USER,
  userData
});

export { addNewUserAction };
