import { createRoutine } from 'redux-saga-routines';

export const addNewUserRoutine = createRoutine('ADD_NEW_USER');
export const fetchUserRoutine = createRoutine('FETCH_USER');
export const editProfileRoutine = createRoutine('EDIT_PROFILE');
export const deleteAccountRoutine = createRoutine('DELETE_ACCOUNT');
export const loginUserRoutine = createRoutine('LOGIN_USER');
export const forgotPasswordRoutine = createRoutine('FORGOT_PASSWORD');
export const resetPasswordRoutine = createRoutine('RESET_PASSWORD');

export const fetchWorkspacesRoutine = createRoutine('FETCH_WORKSPACES');
