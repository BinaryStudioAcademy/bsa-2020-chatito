<<<<<<< HEAD
import { addWorkspaceRoutine, userChannelRoutine } from '../routines';
=======
import { addWorkspaceRoutine } from '../routines/routines';
>>>>>>> f7b9ce56ca6bfc53823261c076674fdb50d1d6cd
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr'
import { addWorkspace } from '../../../services/workspaceService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
  } catch (error) {
    yield put(addWorkspaceRoutine.failure(error));
    yield call(toastr.error, 'Error', 'Failed while adding workspace. Try again.')
  }
}

function* userSelectChannelReq({ payload }: Routine<any>) {
  yield put(userChannelRoutine.success(payload));
}

export default function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
  yield takeEvery(userChannelRoutine.TRIGGER, userSelectChannelReq);
}
