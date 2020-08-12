import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';
import workspaceSaga from 'scenes/Workspace/sagas/index';
import invitePopupSaga from 'containers/InvitePopup/sagas';
import joinInvitedWorkspaceSaga from 'containers/JoinInvitedWorkspace/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga(),
    workspaceSaga(),
    invitePopupSaga(),
    joinInvitedWorkspaceSaga()
  ]);
}
