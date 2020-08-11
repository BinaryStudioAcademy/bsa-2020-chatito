import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';
import WorkspaceSaga from 'scenes/Workspace/sagas';
import ChatSaga from 'scenes/Chat/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga(),
    WorkspaceSaga(),
    ChatSaga()
  ]);
}
