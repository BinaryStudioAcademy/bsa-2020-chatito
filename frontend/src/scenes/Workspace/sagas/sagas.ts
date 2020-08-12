import {
  addWorkspaceRoutine,
  addCommentRoutine,
  fetchPostCommentsRoutine
} from '../routines/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addWorkspace } from 'services/workspaceService';
import { toastrError } from 'services/toastrService';
import { addComment, fetchPostComments } from 'services/threadsService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}

function* addCommentRequest({ payload }: Routine<any>) {
  const { postId } = payload;
  try {
    yield call(addComment, payload);
    yield put(addCommentRoutine.success());
    yield put(fetchPostCommentsRoutine.trigger(postId));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addCommentRoutine.failure());
  }
}

function* watchAddCommentRequest() {
  yield takeEvery(addCommentRoutine.TRIGGER, addCommentRequest);
}

function* fetchPostCommentsRequest({ payload }: Routine<any>) {
  try {
    const comments = yield call(fetchPostComments, payload);
    yield put(fetchPostCommentsRoutine.success(comments));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchPostCommentsRoutine.failure());
  }
}

function* watchFetchPostCommentsRequest() {
  yield takeEvery(fetchPostCommentsRoutine.TRIGGER, fetchPostCommentsRequest);
}

export default function* workspaceSaga() {
  yield all([
    watchAddCommentRequest(),
    watchFetchPostCommentsRequest()
  ]);
}
