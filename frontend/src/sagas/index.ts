import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';
import workspaceSaga from 'scenes/Workspace/sagas';
import chatSaga from 'scenes/Chat/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga(),
    workspaceSaga(),
    chatSaga()
  ]);
}
