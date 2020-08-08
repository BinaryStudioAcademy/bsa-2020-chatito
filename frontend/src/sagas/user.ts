import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines/user';
import { IAuthServerResponse } from '../common/models/auth/IAuthServerResponse';
import { showModalRoutine } from '../routines/modal';
import { ModalTypes } from '../common/enums/ModalTypes';
import api from '../common/helpers/apiHelper';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser } from '../services/authService';
import { setAccessToken } from '../common/helpers/storageHelper';

function* fetchUserRequest(): Routine<any> {
  try {
    const { token, user }: IAuthServerResponse = yield call(fetchUser);
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
    const { token, user }: IAuthServerResponse = yield call(login, payload);
    yield put(loginUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(loginUserRoutine.failure(error.message));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(loginUserRoutine.TRIGGER, loginUserRequest);
}

function* updateProfile({ payload }: Routine<any>) {
  try {
    const response = yield call(api.put, '/api/users/', payload);
    const data = {
      ...response
    };
    yield put(editProfileRoutine.success(data));
    yield put(showModalRoutine({ modalType: ModalTypes.EditProfile, show: false }));
  } catch (error) {
    yield put(editProfileRoutine.failure(error.message));
  }
}

function* watchUpdateProfile() {
  yield takeEvery(editProfileRoutine.TRIGGER, updateProfile);
}

function* addNewUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: IAuthServerResponse = yield call(registration, payload);
    yield put(addNewUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(addNewUserRoutine.failure(error.message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

function* forgotPasswordRequest({ payload }: Routine<any>) {
  try {
    const response = yield call(api.put, '/api/auth/forgotpass', payload);
    yield put(forgotPasswordRoutine.success());
  } catch (error) {
    yield put(forgotPasswordRoutine.failure(error.message));
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(forgotPasswordRoutine.TRIGGER, forgotPasswordRequest);
}

function* resetPasswordRequest({ payload }: Routine<any>) {
  try {
    const { token, password } = payload;
    setAccessToken(token);
    const response = yield call(api.put, '/api/auth/resetpass', { password });
    yield put(resetPasswordRoutine.success());
  } catch (error) {
    yield put(resetPasswordRoutine.failure(error.message));
  }
}

function* watchResetPasswordRequest() {
  yield takeEvery(resetPasswordRoutine.TRIGGER, resetPasswordRequest);
}

export default function* userSaga() {
  yield all([
    watchAddNewUserRequest(),
    watchUserRequest(),
    watchUpdateProfile(),
    watchAddNewUserRequest(),
    watchForgotPasswordRequest(),
    watchLoginUserRequest(),
    watchResetPasswordRequest()
  ]);
}
