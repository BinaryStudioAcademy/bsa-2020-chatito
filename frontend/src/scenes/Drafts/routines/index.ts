import { createRoutine } from 'redux-saga-routines';

export const fetchDraftsRoutine = createRoutine('FETCH_DRAFTS');
export const openThreadRoutine = createRoutine('OPEN_THREAD_FROM_DRAFT');
