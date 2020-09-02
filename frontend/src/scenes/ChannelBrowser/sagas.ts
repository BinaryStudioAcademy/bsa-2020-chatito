import { all, takeEvery, call, put } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { fetchBrowserChannelsRoutine } from './routines';
import { fetchBrowserChannels } from 'services/chatService';
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

export default function* сhannelBrowserSaga() {
  yield all([
    watchFetchBrowserChannelsRequest()
  ]);
}
