import { all } from 'redux-saga/effects';
import userSaga from './user';
import workspaceSaga from 'scenes/Workspace/sagas';
import chatSaga from 'scenes/Chat/sagas';
import invitePopupSaga from 'containers/InvitePopup/sagas';
import joinInvitedWorkspaceSaga from 'containers/JoinInvitedWorkspace/sagas';
import workspaceUsersSaga from 'containers/CreateDirectForm/sagas/sagas';
import threadSaga from 'containers/Thread/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    chatSaga(),
    workspaceUsersSaga(),
    workspaceSaga(),
    invitePopupSaga(),
    joinInvitedWorkspaceSaga(),
    threadSaga()
  ]);
}
