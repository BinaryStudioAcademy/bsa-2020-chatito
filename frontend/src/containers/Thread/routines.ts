import { createRoutine } from 'redux-saga-routines';

export const addCommentRoutine = createRoutine('ADD_COMMENT');
export const upsertDraftCommentRoutine = createRoutine('UPSERT_DRAFT_COMMENT');
export const deleteDraftCommentRoutine = createRoutine('DELETE_DRAFT_COMMENT');
