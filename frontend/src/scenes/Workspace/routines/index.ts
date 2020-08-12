import { createRoutine } from 'redux-saga-routines';

export const addWorkspaceRoutine = createRoutine('ADD_WORKSPACE');
export const selectWorkspaceRoutine = createRoutine('SELECT_WORKSPACE');
export const selectChatRoutine = createRoutine('SELECT_CHAT');
export const fetchUserChannelsRoutine = createRoutine('FETCH_USER_CHANNELS');
export const fetchUserDirectsRoutine = createRoutine('FETCH_USER_DIRECTS');
