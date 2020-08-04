import { all } from 'redux-saga/effects';
import usersPageSagas from './usersPageSagas';

export default function* rootSaga() {
  yield all([
    usersPageSagas()
  ]);
}
