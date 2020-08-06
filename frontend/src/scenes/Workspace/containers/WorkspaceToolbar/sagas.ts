import { fetchWorkspacesRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { getWorkspaces } from '../../../../services/workspaceService';

function* fetchWorkspaces() {
  try {
    const workspaces = yield call(getWorkspaces);
    yield put(fetchWorkspacesRoutine.success(workspaces));
  } catch (error) {
    yield put(fetchWorkspacesRoutine.failure(error));
  }
}

function* watchFetchWorkspaces() {
  yield takeEvery(fetchWorkspacesRoutine.TRIGGER, fetchWorkspaces);
}

export default function* WorkspaceToolbarSaga() {
  yield all([
    watchFetchWorkspaces()
  ]);
}
