import { createRoutine } from 'redux-saga-routines';

export const setCurrentChatRoutine = createRoutine('SET_CURRENT_CHAT');
export const setPostsRoutine = createRoutine('SET_POSTS');
export const upsertDraftPostRoutine = createRoutine('UPSERT_DRAFT_POST');
export const deleteDraftPostRoutine = createRoutine('DELETE_DRAFT_POST');
export const addPostRoutine = createRoutine('ADD_POST');
export const createChatRoutine = createRoutine('CREATE_CHAT');
export const fetchChatUsersRoutine = createRoutine('FETCH_CHAT_USERS');
export const removeUserFromChatRoutine = createRoutine('REMOVE_USER_FROM_CHAT');
export const addPostWithSocketRoutine = createRoutine('ADD_POST_WITH_SOCKET');
export const editPostWithSocketRoutine = createRoutine('EDIT_POST_WITH_SOCKET');
export const addChatWithSocketRoutine = createRoutine('ADD_CHAT_WITH_SOCKET');
export const addUsersToChatRoutine = createRoutine('ADD_USERS_TO_CHAT');
