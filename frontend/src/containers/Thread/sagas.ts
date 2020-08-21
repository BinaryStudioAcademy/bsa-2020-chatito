import { addCommentRoutine, upsertDraftCommentRoutine, deleteDraftCommentRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addComment } from 'services/threadsService';
import { toastrError } from 'services/toastrService';
import { upsertDraftComment, deleteDraftComment } from 'services/draftService';
import { updatePostDraftCommentRoutine } from 'scenes/Chat/routines';

function* addCommentRequest({ payload }: Routine<any>) {
  try {
    yield call(addComment, payload);
    yield put(deleteDraftCommentRoutine.trigger({ postId: payload.postId }));

    yield put(addCommentRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addCommentRoutine.failure());
  }
}

function* watchAddCommentRequest() {
  yield takeEvery(addCommentRoutine.TRIGGER, addCommentRequest);
}

function* upsertDraftCommentRequest({ payload }: Routine<any>) {
  try {
    const response = yield call(upsertDraftComment, payload);
    yield put(updatePostDraftCommentRoutine.trigger({ ...response, postId: payload.postId }));

    yield put(upsertDraftCommentRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchUpsertDraftCommentRequest() {
  yield takeEvery(upsertDraftCommentRoutine.TRIGGER, upsertDraftCommentRequest);
}

function* deleteDraftCommentRequest({ payload }: Routine<any>) {
  try {
    yield call(deleteDraftComment, payload);
    yield put(updatePostDraftCommentRoutine.trigger(payload));

    yield put(deleteDraftCommentRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchDeleteDraftCommentRequest() {
  yield takeEvery(deleteDraftCommentRoutine.TRIGGER, deleteDraftCommentRequest);
}

export default function* threadSaga() {
  yield all([
    watchAddCommentRequest(),
    watchUpsertDraftCommentRequest(),
    watchDeleteDraftCommentRequest()
  ]);
}
