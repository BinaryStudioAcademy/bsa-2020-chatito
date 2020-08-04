import { all } from 'redux-saga/effects';
import usersSagas from './usersSagas';

export default function* rootSaga() {
  yield all([
    usersSagas()
  ]);
}
