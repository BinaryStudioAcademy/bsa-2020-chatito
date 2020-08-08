import { ModalTypes } from './../common/enums/ModalTypes';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
<<<<<<< HEAD
  deleteAccountRoutine as delAccount,
=======
>>>>>>> 2d40902638f6ffb2cd4d520712246d735d105b9c
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines/user';
import { Routine } from 'redux-saga-routines';
import { registration, login } from '../services/authService';
import { setAccessToken } from '../common/helpers/storageHelper';
import { ISignServerResponse } from '../common/models/auth/auth';
import { showModalRoutine } from '../routines/modal';
import api from '../common/helpers/apiHelper';

function* fetchUserRequest({ payload }: any): Routine<any> {
  try {
    const { token, user }: ISignServerResponse = yield call(login, payload);
    yield put(fetchUserRoutine.success({ payload: user }));
    setAccessToken(token);
  } catch (error) {
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
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

function* deleteAccount() {
  try {
    const response = yield call(api.delete, '/api/users/');
    const data = {
      ...response
    };
    yield put(delAccount.success(data));
  } catch (error) {
    yield put(delAccount.failure(error.message));
  } finally {
    yield put(showModalRoutine.trigger({ modalType: ModalTypes.EditProfile, show: false }));
  }
}

function* watchDeleteAccount() {
  yield takeEvery(delAccount.TRIGGER, deleteAccount);
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
    watchUserRequest(),
    watchUpdateProfile(),
    watchAddNewUserRequest(),
<<<<<<< HEAD
    watchDeleteAccount(),
=======
>>>>>>> 2d40902638f6ffb2cd4d520712246d735d105b9c
    watchForgotPasswordRequest(),
    watchResetPasswordRequest()
  ]);
}
