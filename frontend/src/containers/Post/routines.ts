import { createRoutine } from 'redux-saga-routines';

export const addPostReactionRoutine = createRoutine('ADD_POST_REACTION');
export const deletePostReactionRoutine = createRoutine('DELETE_POST_REACTION');
export const addPostReactionWithSocketRoutine = createRoutine('ADD_POST_REACTION_WITH_SOCKET');
export const deletePostReactionWithSocketRoutine = createRoutine('DELETE_POST_REACTION_WITH_SOCKET');
