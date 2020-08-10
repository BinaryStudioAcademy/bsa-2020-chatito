import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  deleteAccountRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines/user';
import { IAuthServerResponse } from '@models/auth/IAuthServerResponse';
import { showModalRoutine } from '../routines/modal';
import { ModalTypes } from '@enums/ModalTypes';
import api from '@helpers/apiHelper';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser } from '../services/authService';
import { setAccessToken } from '@helpers/storageHelper';
import { toastr } from 'react-redux-toastr';

function* fetchUserRequest(): Routine<any> {
  try {
    const { token, user }: IAuthServerResponse = yield call(fetchUser);
    yield put(fetchUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield call(toastr.error, 'Error', 'An Error accurred while you tried to log in, try again.');
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
    yield call(toastr.error, 'Error', 'An Error accurred while you tried to log in, try again.');
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
    yield call(toastr.error, 'Error', 'Editing profile failed.');
    yield put(editProfileRoutine.failure(error.message));
  }
}

function* watchUpdateProfile() {
  yield takeEvery(editProfileRoutine.TRIGGER, updateProfile);
}

function* deleteAccount() {
  try {
    const response = yield call(api.delete, '/api/users/');
    const data = {
      ...response
    };
    yield put(deleteAccountRoutine.success(data));
  } catch (error) {
    yield call(toastr.error, 'Error', 'Oops, something went wrong, try again. Are you sure want to delete account?');
    yield put(deleteAccountRoutine.failure(error.message));
  } finally {
    yield put(showModalRoutine.trigger({ modalType: ModalTypes.EditProfile, show: false }));
  }
}

function* watchDeleteAccount() {
  yield takeEvery(deleteAccountRoutine.TRIGGER, deleteAccount);
}

function* addNewUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: IAuthServerResponse = yield call(registration, payload);
    yield put(addNewUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield call(toastr.error, 'Error', 'While we were registering your account, something went wrong.');
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
    yield call(toastr.error, 'Error', 'Something went wrong, you may have entered wrong email.');
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
    yield call(toastr.error, 'Error', 'Oops, try again reset your password.');
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
    watchDeleteAccount(),
    watchForgotPasswordRequest(),
    watchLoginUserRequest(),
    watchDeleteAccount(),
    watchResetPasswordRequest()
  ]);
}
