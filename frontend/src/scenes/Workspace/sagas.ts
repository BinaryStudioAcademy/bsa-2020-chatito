import { postWorkspaceNameRoutine } from './routines'
import { Routine } from 'redux-saga-routines';
import {takeEvery, put, call} from 'redux-saga/effects'
import {addWorkspace} from '../../services/workspaceService'

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(postWorkspaceNameRoutine.success(workspace));
  } catch (error) {
    yield put(postWorkspaceNameRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(postWorkspaceNameRoutine.TRIGGER, addWorkspaceReq)
}
