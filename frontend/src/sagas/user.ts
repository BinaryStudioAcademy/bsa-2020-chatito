import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  deleteAccountRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine,
  fetchWorkspacesRoutine
} from 'routines/user';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { getWorkspaces } from 'services/workspaceService';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import api from 'common/helpers/apiHelper';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser } from 'services/authService';
import { setAccessToken } from 'common/helpers/storageHelper';
import { toastr } from 'react-redux-toastr';
import { IUser } from '../common/models/user/IUser';
import { history } from '../common/helpers/historyHelper';
import { push } from 'connected-react-router';

function* fetchUserRequest(): Routine<any> {
  try {
    const user: IUser = yield call(fetchUser);
    yield put(fetchUserRoutine.success(user));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

function* loginUserRequest({ payload }: Routine<any>) {
  try {
    const { accessToken, user }: IAuthServerResponse = yield call(login, payload);
    yield put(loginUserRoutine.success(user));
    setAccessToken(accessToken);
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
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
    yield call(toastr.error, 'Error', error.message);
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
    yield call(toastr.error, 'Error', error.message);
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
    const { accessToken, user }: IAuthServerResponse = yield call(registration, payload);
    yield put(addNewUserRoutine.success(user));
    setAccessToken(accessToken);
    history.push('/add-workspace');
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(addNewUserRoutine.failure(error.message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

function* forgotPasswordRequest({ payload }: Routine<any>) {
  try {
    yield call(api.put, '/api/auth/forgotpass', payload);
    yield put(forgotPasswordRoutine.success());
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(forgotPasswordRoutine.failure(error.message));
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(forgotPasswordRoutine.TRIGGER, forgotPasswordRequest);
}

function* resetPasswordRequest({ payload }: Routine<any>) {
  try {
    const { token, password } = payload;
    yield call(api.put, '/api/auth/resetpass', { password, token });
    yield put(push('/signin'));
    yield put(resetPasswordRoutine.success());
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(resetPasswordRoutine.failure(error.message));
  }
}

function* watchResetPasswordRequest() {
  yield takeEvery(resetPasswordRoutine.TRIGGER, resetPasswordRequest);
}

function* fetchWorkspaces() {
  try {
    const workspaces = yield call(getWorkspaces);

    yield put(fetchWorkspacesRoutine.success(workspaces));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(fetchWorkspacesRoutine.failure(error));
  }
}

function* watchFetchWorkspaces() {
  yield takeEvery(fetchWorkspacesRoutine.TRIGGER, fetchWorkspaces);
}

export default function* userSaga() {
  yield all([
    watchAddNewUserRequest(),
    watchUserRequest(),
    watchUpdateProfile(),
    watchForgotPasswordRequest(),
    watchLoginUserRequest(),
    watchDeleteAccount(),
    watchResetPasswordRequest(),
    watchFetchWorkspaces()
  ]);
}
