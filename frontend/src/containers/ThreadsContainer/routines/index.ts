import { createRoutine } from 'redux-saga-routines';

export const fetchThreadsRoutine = createRoutine('FETCH_THREADS');
export const goToThreadsRoutine = createRoutine('GO_TO_THREADS');
export const addCommentWithSocketRoutine = createRoutine('ADD_COMMENT_WITH_SOCKET_ROUTINE');
