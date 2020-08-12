import { getWorkspaceUsers } from 'services/workspaceService';
import { fetchWorkspaceUsersRoutine } from '../routines/index';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';

function* fetchWorkspaceUsers({ payload }: Routine<any>) {
  try {
    const threads = yield call(getWorkspaceUsers, payload);
    yield put(fetchWorkspaceUsersRoutine.success(threads));
  } catch (error) {
    yield put(fetchWorkspaceUsersRoutine.failure(error));
  }
}

function* watchFetchWorkspaceUsers() {
  yield takeEvery(fetchWorkspaceUsersRoutine.TRIGGER, fetchWorkspaceUsers);
}

export default function* workspaceUsersSaga() {
  yield all([
    watchFetchWorkspaceUsers()
  ]);
}
