import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser } from '../services/authService';
import { setAccessToken } from '../common/helpers/storageHelper';
import { addNewUserRoutine, fetchUserRoutine, loginUserRoutine } from '../routines/user';
import { ISignServerResponse } from '../common/models/auth/ISignServerResponse';

function* fetchUserRequest(): Routine<any> {
  try {
    const { token, user }: ISignServerResponse = yield call(fetchUser);
    yield put(fetchUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

function* loginUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: ISignServerResponse = yield call(login, payload);
    yield put(loginUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(loginUserRoutine.failure(error.message));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(loginUserRoutine.TRIGGER, loginUserRequest);
}

function* addNewUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: ISignServerResponse = yield call(registration, payload);
    yield put(addNewUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(addNewUserRoutine.failure(error.message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

export default function* userSaga() {
  yield all([
    watchAddNewUserRequest(),
    watchUserRequest(),
    watchLoginUserRequest()
  ]);
}
