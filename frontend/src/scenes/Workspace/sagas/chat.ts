import { history } from 'common/helpers/historyHelper';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { showModalRoutine } from 'routines/modal';
import { toastrError } from 'services/toastrService';
import { fetchUserChatsRoutine } from 'scenes/Workspace/routines';
import { createChatRoutine } from '../routines/chat';
import { createChat } from 'services/chatServise';

function* toggleCreateChatModal({ payload }: Routine<any>) {
  yield call(showModalRoutine, payload);
}

function* watchToggleCreateChatModal() {
  yield takeEvery(showModalRoutine.TRIGGER, toggleCreateChatModal);
}

function* createChatRequest({ payload }: Routine<any>) {
  try {
    const chat = yield call(createChat, payload);
    yield put(createChatRoutine.success(chat));
    yield put(showModalRoutine({ modalType: payload.type, show: false }));

    yield put(fetchUserChatsRoutine.trigger());
    // history.push(`/Direct/${payload.chat}`);
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(createChatRoutine.failure());
  }
}

function* watchCreateChatRequest() {
  yield takeEvery(createChatRoutine.TRIGGER, createChatRequest);
}

export default function* chatSaga() {
  yield all([
    watchCreateChatRequest(),
    watchToggleCreateChatModal()
  ]);
}
