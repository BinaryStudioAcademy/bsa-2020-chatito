import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';
import workspaceSaga from 'scenes/Workspace/sagas';
import chatSaga from 'scenes/Chat/sagas';
import invitePopupSaga from 'containers/InvitePopup/sagas';
import joinInvitedWorkspaceSaga from 'containers/JoinInvitedWorkspace/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga(),
    workspaceSaga(),
    chatSaga(),
    invitePopupSaga(),
    joinInvitedWorkspaceSaga()
  ]);
}
