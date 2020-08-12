import { all } from 'redux-saga/effects';
import userSaga from './user';
import chatSaga from '../scenes/Workspace/sagas/chat';
import workspaceSaga from 'scenes/Workspace/sagas/index';

export default function* rootSaga() {
  yield all([
    userSaga(),
    chatSaga(),
    workspaceSaga()
  ]);
}
