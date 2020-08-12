import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';
import directSaga from './direct';
import workspaceSaga from 'scenes/Workspace/sagas/index';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga(),
    directSaga(),
    workspaceSaga()
  ]);
}
