import { createRoutine } from 'redux-saga-routines';

const addNewUserRoutine = createRoutine('ADD_NEW_USER');
const fetchUserRoutine = createRoutine('FETCH_USER');
const editProfile = createRoutine('EDIT_PROFILE');

export { addNewUserRoutine, fetchUserRoutine, editProfile };
