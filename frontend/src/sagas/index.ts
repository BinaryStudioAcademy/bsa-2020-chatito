import { all } from 'redux-saga/effects';
import userSaga from './user';
import watchPostWorkspaceName from '../scenes/Workspace/sagas/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchPostWorkspaceName()
  ]);
}
