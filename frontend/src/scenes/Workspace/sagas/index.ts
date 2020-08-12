import { addWorkspaceRoutine, fetchChannelsRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { addWorkspace } from 'services/workspaceService';
import { fetchUserChannels } from 'services/channelService';

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

function* fetchChannelsRequest() {
  try {
    const response = yield call(fetchUserChannels);
    yield put(fetchChannelsRoutine.success(response));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(fetchChannelsRoutine.failure(error));
  }
}

function* watchFetchChannelsRequest() {
  yield takeEvery(fetchChannelsRoutine.TRIGGER, fetchChannelsRequest);
}

export default function* workspaceSaga() {
  yield all([
    watchPostWorkspaceName(),
    watchFetchChannelsRequest()
  ]);
}
