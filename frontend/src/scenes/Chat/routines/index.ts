import { createRoutine } from 'redux-saga-routines';

export const setCurrentChatRoutine = createRoutine('SET_CURRENT_CHAT');
export const setPostsRoutine = createRoutine('SET_POSTS');
export const addPostRoutine = createRoutine('ADD_POST');
export const createChatRoutine = createRoutine('CREATE_CHAT');
export const addPostWithSocketRoutine = createRoutine('ADD_POST_WITH_SOCKET');
export const editPostWithSocketRoutine = createRoutine('EDIT_POST_WITH_SOCKET');
