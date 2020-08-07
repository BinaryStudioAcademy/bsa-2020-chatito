import { createRoutine } from 'redux-saga-routines';

const fetchPostsRoutine = createRoutine('FETSCH_POSTS');
const editPostRoutine = createRoutine('EDIT_POST');

export { fetchPostsRoutine, editPostRoutine };
