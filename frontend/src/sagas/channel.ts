import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { createChannelRoutine, fetchUserChannelsRoutine } from '../routines/channel';

// tmp mocks
const createChannelService = (payload: any) => console.log(payload);
const fetchUserChannelsService = () => console.log('fetch user channels service');

function* createChannelRequest({ payload }: Routine<any>) {
  try {
    yield call(createChannelService, payload);
    yield put(createChannelRoutine.success());

    yield put(fetchUserChannelsRoutine.trigger());
  } catch (error) {
    yield put(createChannelRoutine.failure());
  }
}

function* watchCreateChannelRequest() {
  yield takeEvery(createChannelRoutine.TRIGGER, createChannelRequest);
}

function* fetchUserChannelsRequest() {
  try {
    const response = yield call(fetchUserChannelsService);
    yield put(fetchUserChannelsRoutine.success(response));
  } catch (error) {
    yield put(fetchUserChannelsRoutine.failure(error.message));
  }
}

function* watchFetchUserChannelsRequest() {
  yield takeEvery(fetchUserChannelsRoutine.TRIGGER, fetchUserChannelsRequest);
}

export default function* channelSaga() {
  yield all([
    watchCreateChannelRequest(),
    watchFetchUserChannelsRequest()
  ]);
}
