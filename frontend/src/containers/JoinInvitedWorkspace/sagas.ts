import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';

import { selectWorkspaceRoutine } from 'scenes/Workspace/routines';
import { setInvitedUserEmailRoutine } from 'routines/user';
import { checkInvitedUserRegisteredRoutine } from './routines';
import { checkInvitedUserRegistered } from 'services/inviteLinkService';
import { IInvitedUserRegisteredResponse } from 'common/models/inviteLink/IInvitedUserRegisteredResponse';
import { Routes } from 'common/enums/Routes';

function* checkInvitedUserRegisteredRequest({ payload }: Routine<any>) {
  try {
    const {
      isRegistered,
      invitedUserEmail,
      workspace
    }: IInvitedUserRegisteredResponse = yield call(checkInvitedUserRegistered, payload);

    yield put(setInvitedUserEmailRoutine(invitedUserEmail));
    yield put(selectWorkspaceRoutine(workspace));

    yield isRegistered ? put(push(Routes.SignIn)) : put(push(Routes.SignIn));

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
