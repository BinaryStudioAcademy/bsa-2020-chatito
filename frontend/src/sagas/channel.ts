import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { createChannelRoutine, fetchUserChannelsRoutine } from 'routines/channel';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { createChannel } from 'services/channelService';
import { toastrError } from 'services/toastrService';

function* createChannelRequest({ payload }: Routine<any>) {
  try {
    yield call(createChannel, payload);
    yield put(createChannelRoutine.success());
    yield put(showModalRoutine({ modalType: ModalTypes.CreateChannel, show: false }));

    yield put(fetchUserChannelsRoutine.trigger());
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(createChannelRoutine.failure());
  }
}

function* watchCreateChannelRequest() {
  yield takeEvery(createChannelRoutine.TRIGGER, createChannelRequest);
}

function* toggleCreateChannelModal({ payload }: Routine<any>) {
  yield call(showModalRoutine, payload);
}

function* watchToggleCreateChannelModal() {
  yield takeEvery(showModalRoutine.TRIGGER, toggleCreateChannelModal);
}

export default function* channelSaga() {
  yield all([
    watchCreateChannelRequest(),
    watchToggleCreateChannelModal()
  ]);
}
