import { createRoutine } from 'redux-saga-routines';

export const addNewUserRoutine = createRoutine('ADD_NEW_USER');
export const fetchUserRoutine = createRoutine('FETCH_USER');
export const editProfileRoutine = createRoutine('EDIT_PROFILE');
export const deleteAccountRoutine = createRoutine('DELETE_ACCOUNT');
export const loginUserRoutine = createRoutine('LOGIN_USER');
export const loginWithGoogleRoutine = createRoutine('LOGIN_WITH_GOOGLE');
export const loginWithFacebookRoutine = createRoutine('LOGIN_WITH_FACEBOOK');
export const forgotPasswordRoutine = createRoutine('FORGOT_PASSWORD');
export const resetPasswordRoutine = createRoutine('RESET_PASSWORD');
export const editStatusRoutine = createRoutine('EDIT_STATUS');
export const fetchWorkspacesRoutine = createRoutine('FETCH_WORKSPACES');
export const setInvitedUserRoutine = createRoutine('SET_INVITED_USER');
export const updateAvatarRoutine = createRoutine('UPDATE_AVATAR');
export const updateAudioRoutine = createRoutine('UPDATE_AUDIO');
