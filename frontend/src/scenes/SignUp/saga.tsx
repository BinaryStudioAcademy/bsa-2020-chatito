import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { registration } from '../../services/authService';
import { setAccessToken } from '../../common/helpers/storageHelper';
import { addNewUserRoutine } from './routines';
import { ISignServerResponse } from '../../common/models/signIn-signUp/user';

function* addNewUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: ISignServerResponse = yield call(registration, payload);
    yield put(addNewUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    throw Error;
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery( addNewUserRoutine.TRIGGER, addNewUserRequest);
}

export default function* signUpSaga() {
  yield all([
    watchAddNewUserRequest()
  ]);
}
