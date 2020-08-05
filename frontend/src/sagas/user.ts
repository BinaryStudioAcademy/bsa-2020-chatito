import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchUserRoutine } from '../routines/user';

function* fetchUserRequest() {
  try {
    const response = yield call(() => 'implement service');
    yield put(fetchUserRoutine.success(response));
  } catch (error) {
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

export default function* userSaga() {
  yield all([
    watchUserRequest()
  ]);
}
