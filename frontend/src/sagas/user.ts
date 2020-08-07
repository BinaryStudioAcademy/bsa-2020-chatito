import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchUserRoutine, editProfileRoutine, addNewUserRoutine } from '../routines/user';
import { Routine } from 'redux-saga-routines';
import { registration, login } from '../services/authService';
import { setAccessToken } from '../common/helpers/storageHelper';
import { ISignServerResponse } from '../common/models/auth/auth';
import { showModalRoutine } from '../routines/modal';
import { ModalTypes } from '../common/enums/ModalTypes';

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
    watchAddNewUserRequest()
  ]);
}
