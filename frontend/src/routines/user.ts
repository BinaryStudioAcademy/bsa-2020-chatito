import { createRoutine } from 'redux-saga-routines';

export const fetchUserRoutine = createRoutine('FETCH_USER');
export const editProfile = createRoutine('EDIT_PROFILE');
export const deleteAccountRoutine = createRoutine('DELETE_ACCOUNT');
export const addNewUserRoutine = createRoutine('ADD_NEW_USER');
