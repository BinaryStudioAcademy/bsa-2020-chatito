import { fetchThreadsRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { getThreads } from 'services/threadsService';

function* fetchThreads({ payload }: Routine<any>) {
  try {
    const threads = yield call(getThreads, payload);
    yield put(fetchThreadsRoutine.success(threads));
  } catch (error) {
    yield put(fetchThreadsRoutine.failure(error));
  }
}

function* watchFetchThreads() {
  yield takeEvery(fetchThreadsRoutine.TRIGGER, fetchThreads);
}

export default function* threadsSaga() {
  yield all([
    watchFetchThreads()
  ]);
}
