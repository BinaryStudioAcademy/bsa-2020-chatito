import { addCommentRoutine, upsertDraftCommentRoutine, deleteDraftCommentRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addComment } from 'services/threadsService';
import { toastrError } from 'services/toastrService';
import { upsertDraftComment, deleteDraftComment } from 'services/draftService';

function* addCommentRequest({ payload }: Routine<any>) {
  try {
    yield call(addComment, payload);

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
    yield call(upsertDraftComment, payload);
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
