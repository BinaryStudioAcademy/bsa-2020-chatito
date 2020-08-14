import { createRoutine } from 'redux-saga-routines';

export const setCurrentChatRoutine = createRoutine('SET_CURRENT_CHAT');
export const setPostsRoutine = createRoutine('SET_POSTS');
export const addPostRoutine = createRoutine('ADD_POST_ROUTINE');
export const createChatRoutine = createRoutine('CREATE_CHAT');
export const fetchChatUsersRoutine = createRoutine('FETCH_CHAT_USERS');
