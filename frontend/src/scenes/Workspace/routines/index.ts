import { createRoutine } from 'redux-saga-routines';

export const addWorkspaceRoutine = createRoutine('ADD_WORKSPACE');
export const selectWorkspaceRoutine = createRoutine('SELECT_WORKSPACE');
export const selectChatRoutine = createRoutine('SELECT_CHAT');

export const showRightSideMenuRoutine = createRoutine('SHOW_RIGHT_MENU');
export const setActiveThreadRoutine = createRoutine('SET_ACTIVE_THREAD');
export const addActiveCommentWithSocketRoutine = createRoutine('ADD_ACTIVE_COMMENT_WITH_SOCKET');
export const showUserProfileRoutine = createRoutine('SHOW_USER_PROFILE');
export const fetchPostCommentsRoutine = createRoutine('FETCH_POST_COMMENTS');
export const fetchWorkspaceChatsRoutine = createRoutine('FETCH_WORKSPACE_CHATS');
export const incUnreadCountRoutine = createRoutine('INC_UNREAD_COUNT');
export const fetchWorkspaceUsersRoutine = createRoutine('FETCH_WORKSPACE_USERS');
export const updateChatDraftPostRoutine = createRoutine('UPDATE_CHAT_DRAFT_POST');
export const newUserNotificationWithSocketRoutine = createRoutine('NEW_USER_NOTIFICATION_WITH_SOCKET');
export const deleteFromChatWithSocketRoutine = createRoutine('DELETE_FROM_CHAT_WITH_SOCKET');

export const markAsUnreadPostWithSocketRoutine = createRoutine('MARK_AS_UNREAD_POST_WITH_SOCKET');
export const markAsUnreadPostWithOptionRoutine = createRoutine('MARK_AS_UNREAD_POST_WITH_OPTION');
export const fetchUnreadUserPostsRoutine = createRoutine('FETCH_UNREAD_USER_POSTS_ROUTINE');
export const readPostRoutine = createRoutine('READ_POST_ROUTINE');

export const markAsUnreadCommentWithSocketRoutine = createRoutine('MARK_AS_UNREAD_COMMENT_WITH_SOCKET');
export const markAsUnreadCommentWithOptionRoutine = createRoutine('MARK_AS_UNREAD_COMMENT_WITH_OPTION');
export const fetchUnreadUserCommentsRoutine = createRoutine('FETCH_UNREAD_USER_COMMENTS_ROUTINE');
export const readCommentRoutine = createRoutine('READ_COMMENT_ROUTINE');
export const removeUserFromChatInWorkspaceRoutine = createRoutine('REMOVE_USER_FROM_CHAT_IN_WORKSPACE');

export const editCommentWithSocketRoutine = createRoutine('EDIT_COMMENT_WITH_SOCKET');
export const deleteCommentWithSocketRoutine = createRoutine('DELETE_COMMENT_WITH_SOCKET');
