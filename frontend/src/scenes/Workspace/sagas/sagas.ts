import { addWorkspaceRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call } from 'redux-saga/effects';
import { addWorkspace } from '../../../services/workspaceService';
import { toastr } from 'react-redux-toastr'

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
  } catch (error) {
    yield put(addWorkspaceRoutine.failure(error));
    yield call(toastr.error, 'Error', 'Failed while adding workspace. Try again.')
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}
