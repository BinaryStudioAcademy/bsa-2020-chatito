import { all } from 'redux-saga/effects';
import userSaga from './user';
import channelSaga from './channel';

export default function* rootSaga() {
  yield all([
    userSaga(),
    channelSaga()
  ]);
}
