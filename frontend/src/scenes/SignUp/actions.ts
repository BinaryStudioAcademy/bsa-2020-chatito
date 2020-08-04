import { ADD_NEW_USER } from './actionTypes';
import { ActionCreatorsMapObject } from 'redux';

const addNewUserAction = (userData: object) => ({
  type: ADD_NEW_USER,
  userData: userData
});

export { addNewUserAction };
