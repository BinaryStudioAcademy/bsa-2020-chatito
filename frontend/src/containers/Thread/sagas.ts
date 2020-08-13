import { addCommentRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addComment } from 'services/threadsService';
import { toastrError } from 'services/toastrService';

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

export default function* threadSaga() {
  yield all([
    watchAddCommentRequest()
  ]);
}
