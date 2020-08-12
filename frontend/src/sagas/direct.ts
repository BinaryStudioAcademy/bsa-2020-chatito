import { history } from 'common/helpers/historyHelper';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { createDirectRoutine } from 'routines/direct';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { createDirect } from 'services/directService';
import { toastrError } from 'services/toastrService';
import { fetchUserDirectsRoutine } from 'scenes/Workspace/routines';

function* createDirectRequest({ payload }: Routine<any>) {
  try {
    const chat = yield call(createDirect, payload);
    yield put(createDirectRoutine.success(chat));
    yield put(showModalRoutine({ modalType: ModalTypes.CreateDirect, show: false }));

    yield put(fetchUserDirectsRoutine.trigger());
    // history.push(`/Direct/${payload.chat}`);
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(createDirectRoutine.failure());
  }
}

function* watchCreateDirectRequest() {
  yield takeEvery(createDirectRoutine.TRIGGER, createDirectRequest);
}

function* toggleCreateDirectModal({ payload }: Routine<any>) {
  yield call(showModalRoutine, payload);
}

function* watchToggleCreateDirectModal() {
  yield takeEvery(showModalRoutine.TRIGGER, toggleCreateDirectModal);
}

export default function* DirectSaga() {
  yield all([
    watchCreateDirectRequest(),
    watchToggleCreateDirectModal()
  ]);
}
