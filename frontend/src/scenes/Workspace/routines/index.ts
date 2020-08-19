import { createRoutine } from 'redux-saga-routines';

export const addWorkspaceRoutine = createRoutine('ADD_WORKSPACE');
export const selectWorkspaceRoutine = createRoutine('SELECT_WORKSPACE');
export const selectChatRoutine = createRoutine('SELECT_CHAT');

export const showRightSideMenuRoutine = createRoutine('SHOW_RIGHT_MENU');
export const setActiveThreadRoutine = createRoutine('SET_ACTIVE_THREAD');
export const addActiveCommentWithSocketRoutine = createRoutine('ADD_ACTIVE_COMMENT_WITH_SOCKET');
export const showUserProfileRoutine = createRoutine('SHOW_USER_PROFILE');
export const fetchPostCommentsRoutine = createRoutine('FETCH_POST_COMMENTS');
export const fetchUserChatsRoutine = createRoutine('FETCH_USER_CHATS');
export const incUnreadCountRoutine = createRoutine('INC_UNREAD_COUNT');
