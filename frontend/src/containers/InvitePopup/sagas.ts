import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { showModalRoutine } from 'routines/modal';
import { sendInviteLinkRoutine } from './routines';
import { sendInviteLink } from 'services/inviteLinkService';
import { ModalTypes } from 'common/enums/ModalTypes';

function* sendInviteLinkRequest({ payload }: Routine<any>) {
  try {
    yield call(sendInviteLink, payload);

    yield put(sendInviteLinkRoutine.success());
    yield put(showModalRoutine({ modalType: ModalTypes.InvitePopup, show: false }));
  } catch (error) {
    yield call(toastr.error, 'Error', 'Something went wrong while sending an invite link, please try again.');
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
