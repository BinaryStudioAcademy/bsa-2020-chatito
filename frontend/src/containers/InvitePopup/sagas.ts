import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { showModalRoutine } from 'routines/modal';
import { sendInviteLinkRoutine } from './routines';
import { sendInviteLink } from 'services/inviteLinkService';
import { ModalTypes } from 'common/enums/ModalTypes';
import { toastrError, toastrSuccess } from 'services/toastrService';

function* sendInviteLinkRequest({ payload }: Routine<any>) {
  try {
    yield call(sendInviteLink, payload);

    yield put(sendInviteLinkRoutine.success());
    yield put(showModalRoutine({ modalType: ModalTypes.InvitePopup, show: false }));
    yield call(toastrSuccess, `Invitation to ${payload.email} sent.`);
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(sendInviteLinkRoutine.failure());
  }
}

function* watchSendInviteLinkRequest() {
  yield takeEvery(sendInviteLinkRoutine.TRIGGER, sendInviteLinkRequest);
}

export default function* inviteLinkSaga() {
  yield all([
    watchSendInviteLinkRequest()
  ]);
}
