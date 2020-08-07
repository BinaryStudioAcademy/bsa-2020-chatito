import { fetchThreadsRoutine } from './routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { getThreads } from '../../services/threadsService';

function* fetchThreads() {
  try {
    const threads = yield call(getThreads);
    yield put(fetchThreadsRoutine.success(threads));
  } catch (error) {
    yield put(fetchThreadsRoutine.failure(error));
  }
}

function* watchFetchThreads() {
  yield takeEvery(fetchThreadsRoutine.TRIGGER, fetchThreads);
}

export default function* ThreadsSaga() {
  yield all([
    watchFetchThreads()
  ]);
}
