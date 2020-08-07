import { ModalTypes } from './../common/enums/ModalTypes';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchUserRoutine, editProfileRoutine, deleteAccountRoutine as delAccount, addNewUserRoutine } from '../routines/user';
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

export default function* userSaga() {
  yield all([
    watchUserRequest(),
    watchUpdateProfile(),
    watchDeleteAccount(),
    watchAddNewUserRequest()
  ]);
}
