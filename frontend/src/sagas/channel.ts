import { history } from 'common/helpers/historyHelper';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { createChannelRoutine } from 'routines/channel';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { createChannel } from 'services/channelService';
import { toastrError } from 'services/toastrService';
import { fetchUserChannelsRoutine } from 'scenes/Workspace/routines';

function* createChannelRequest({ payload }: Routine<any>) {
  try {
    const chat = yield call(createChannel, payload);
    yield put(createChannelRoutine.success(chat));
    yield put(showModalRoutine({ modalType: ModalTypes.CreateChannel, show: false }));

    yield put(fetchUserChannelsRoutine.trigger());
    history.push(`/channel/${payload.chat.name}`);
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
