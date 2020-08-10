import { addWorkspaceRoutine } from '../routines/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { addWorkspace } from '../../../services/workspaceService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}
