import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { checkInvitedUserRegisteredRoutine } from './routines';
import { checkInvitedUserRegistered } from 'services/inviteLinkService';

function* checkInvitedUserRegisteredRequest({ payload }: Routine<any>) {
  try {
    yield call(checkInvitedUserRegistered, payload);

    yield put(checkInvitedUserRegisteredRoutine.success());
  } catch (error) {
    yield call(toastr.error, 'Error', 'Error occured, please try again.');
    yield put(checkInvitedUserRegisteredRoutine.failure());
  }
}

function* watchCheckInvitedUserRegistered() {
  yield takeEvery(checkInvitedUserRegisteredRoutine.TRIGGER, checkInvitedUserRegisteredRequest);
}

export default function* joinInvitedWorkspaceSaga() {
  yield all([
    watchCheckInvitedUserRegistered()
  ]);
}
