import { addWorkspaceRoutine, fetchUserChannelsRoutine } from 'scenes/Workspace/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { addWorkspace } from 'services/workspaceService';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { fetchUserChannels } from 'services/channelService';
import { toastrError } from 'services/toastrService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
    yield put(push(Routes.Workspace.replace(':hash', workspace.hash)));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}

function* fetchUserChannelsRequest() {
  try {
    const response = yield call(fetchUserChannels);
    yield put(fetchUserChannelsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchUserChannelsRoutine.failure(error.message));
  }
}

function* watchFetchUserChannelsRequest() {
  yield takeEvery(fetchUserChannelsRoutine.TRIGGER, fetchUserChannelsRequest);
}

export default function* workspaceSaga() {
  yield all([
    watchPostWorkspaceName(),
    watchFetchUserChannelsRequest()
  ]);
}
