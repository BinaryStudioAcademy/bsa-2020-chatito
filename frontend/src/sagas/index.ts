import { all } from 'redux-saga/effects';
import userSaga from './user';
import chatSaga from '../scenes/Workspace/sagas/chat';
import workspaceSaga from 'scenes/Workspace/sagas/index';
import invitePopupSaga from 'containers/InvitePopup/sagas';
import joinInvitedWorkspaceSaga from 'containers/JoinInvitedWorkspace/sagas';
import workspaceUsersSaga from 'containers/CreateDirectForm/sagas/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    chatSaga(),
    workspaceUsersSaga(),
    workspaceSaga(),
    invitePopupSaga(),
    joinInvitedWorkspaceSaga()
  ]);
}
