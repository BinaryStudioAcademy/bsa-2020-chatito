import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addWorkspace } from 'services/workspaceService';
import { toastrError } from 'services/toastrService';
import { fetchUserChannels } from 'services/channelService';
import { fetchChannelsRoutine, addWorkspaceRoutine } from '../routines';
import { ChatType } from 'common/enums/ChatType';

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

function* fetchUserChannelsRequest() {
  try {
    const response = yield call(fetchUserChannels);
    yield put(fetchChannelsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchChannelsRoutine.failure(error.message));
  }
}

function* watchFetchUserChannelsRequest() {
  yield takeEvery(fetchChannelsRoutine.TRIGGER, fetchUserChannelsRequest);
}

export default function* WorkspaceSaga() {
  yield all([
    watchPostWorkspaceName(),
    watchFetchUserChannelsRequest()
  ]);
}
