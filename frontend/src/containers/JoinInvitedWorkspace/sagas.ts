import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { selectWorkspaceRoutine } from 'scenes/Workspace/routines';
import { setInvitedUserRoutine } from 'routines/user';
import { checkInvitedUserRegisteredRoutine, addInviteWorkspaceRoutine } from './routines';
import { checkInvitedUserRegistered, addUserToWorkspace } from 'services/inviteLinkService';
import { IInvitedUserRegisteredResponse } from 'common/models/inviteLink/IInvitedUserRegisteredResponse';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';

function* checkInvitedUserRegisteredRequest({ payload }: Routine<any>) {
  try {
    const {
      isRegistered,
      invitedUserEmail,
      workspace
    }: IInvitedUserRegisteredResponse = yield call(checkInvitedUserRegistered, payload);

    yield put(setInvitedUserRoutine({ invitedUserRegistered: isRegistered, invitedUserEmail }));
    yield put(selectWorkspaceRoutine(workspace));

    yield put(checkInvitedUserRegisteredRoutine.success());
  } catch (error) {
    yield put(checkInvitedUserRegisteredRoutine.failure());
    yield put(push(Routes.NotExistingPath));
  }
}

function* watchCheckInvitedUserRegistered() {
  yield takeEvery(checkInvitedUserRegisteredRoutine.TRIGGER, checkInvitedUserRegisteredRequest);
}

function* addInviteWorkspaceRequest({ payload }: Routine<any>) {
  try {
    const user = yield call(addUserToWorkspace, payload);
    yield put(addInviteWorkspaceRoutine.success(user));
    const workspace = user.workspaces[user.workspaces.length - 1];
    yield put(push(Routes.Workspace.replace(':whash', workspace.hash)));
  } catch (error) {
    yield put(addInviteWorkspaceRoutine.failure());
  }
}

function* watchAddInviteWorkspace() {
  yield takeEvery(addInviteWorkspaceRoutine.TRIGGER, addInviteWorkspaceRequest);
}

export default function* joinInvitedWorkspaceSaga() {
  yield all([
    watchCheckInvitedUserRegistered(),
    watchAddInviteWorkspace()
  ]);
}
