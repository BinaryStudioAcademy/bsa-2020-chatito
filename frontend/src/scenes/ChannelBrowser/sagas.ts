import { all, takeEvery, call, put } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { fetchBrowserChannelsRoutine, joinChannelRoutine, leaveChannelRoutine } from './routines';
import { fetchBrowserChannels, addUsersToChat, removeUserFromChat } from 'services/chatService';
import { toastrError } from 'services/toastrService';

function* fetchBrowserChannelsRequest({ payload }: Routine<any>) {
  try {
    const channels = yield call(fetchBrowserChannels, payload);
    yield put(fetchBrowserChannelsRoutine.success(channels));
  } catch (error) {
    yield put(fetchBrowserChannelsRoutine.failure());
    yield call(toastrError, 'Fetching channels failed. Please try again later.');
  }
}

function* watchFetchBrowserChannelsRequest() {
  yield takeEvery(fetchBrowserChannelsRoutine.TRIGGER, fetchBrowserChannelsRequest);
}

function* joinChannel({ payload }: Routine<any>) {
  try {
    yield call(addUsersToChat, { chatId: payload.chatId, userIds: [payload.userId] });
    yield put(joinChannelRoutine.success(payload));
  } catch (error) {
    yield put(joinChannelRoutine.failure());
    yield call(toastrError, 'Joining channel failed. Please try again later.');
  }
}

function* watchJoinChannel() {
  yield takeEvery(joinChannelRoutine.TRIGGER, joinChannel);
}

function* leaveChannel({ payload }: Routine<any>) {
  try {
    const { userId, chatId } = payload;
    yield call(removeUserFromChat, chatId, userId);
    yield put(leaveChannelRoutine.success(payload));
  } catch (error) {
    yield put(leaveChannelRoutine.failure());
    yield call(toastrError, 'Leaving channel failed. Please try again later.');
  }
}

function* watchLeaveChannel() {
  yield takeEvery(leaveChannelRoutine.TRIGGER, leaveChannel);
}

export default function* сhannelBrowserSaga() {
  yield all([
    watchFetchBrowserChannelsRequest(),
    watchJoinChannel(),
    watchLeaveChannel()
  ]);
}
