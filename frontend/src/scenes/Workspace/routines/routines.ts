import { createRoutine } from 'redux-saga-routines';

export const addWorkspaceRoutine = createRoutine('ADD_WORKSPACE');
export const selectChatRoutine = createRoutine('SELECT_CHAT');

export const setActiveThreadRoutine = createRoutine('SET_ACTIVE_THREAD');
export const addCommentRoutine = createRoutine('ADD_COMMENT');
export const fetchPostCommentsRoutine = createRoutine('FETCH_POST_COMMENTS');
