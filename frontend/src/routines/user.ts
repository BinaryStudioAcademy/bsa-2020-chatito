import { createRoutine } from 'redux-saga-routines';

const addNewUserRoutine = createRoutine('ADD_NEW_USER');
const fetchUserRoutine = createRoutine('FETCH_USER');

export { addNewUserRoutine, fetchUserRoutine };
