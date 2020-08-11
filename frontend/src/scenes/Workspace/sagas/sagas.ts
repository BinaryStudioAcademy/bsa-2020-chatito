import { addWorkspaceRoutine } from '../routines/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call } from 'redux-saga/effects';
import { addWorkspace } from 'services/workspaceService';
import { toastrError } from 'services/toastrService'

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
