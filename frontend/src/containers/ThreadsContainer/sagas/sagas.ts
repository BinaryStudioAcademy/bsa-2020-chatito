import { fetchThreadsRoutine, goToThreadsRoutine } from '../routines';
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

function* goToThreads({ payload }: Routine<any>) {
  yield put(goToThreadsRoutine.success(payload));
}

function* watchgoToThreads() {
  yield takeEvery(goToThreadsRoutine.TRIGGER, goToThreads);
}

export default function* threadsSaga() {
  yield all([
    watchgoToThreads(),
    watchFetchThreads()
  ]);
}
