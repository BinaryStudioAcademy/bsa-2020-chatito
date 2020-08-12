import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  deleteAccountRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine,
  editStatusRoutine
} from '../routines/user';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser } from 'services/authService';
import { setTokens } from 'common/helpers/storageHelper';
import { editStatus, deleteUser, editUser, forgotPassword, resetPassword } from 'services/userService';
import { toastrError } from 'services/toastrService';
import { push } from 'connected-react-router';
import { IUserWithWorkspaces } from 'common/models/user/IUserWithWorkspaces';
import { Routes } from 'common/enums/Routes';

function* fetchUserRequest({ payload }: Routine<any>) {
  try {
    const user: IUserWithWorkspaces = yield call(fetchUser);

    // TODO: rewrite if else

    if (payload.workspace.id) { // selected workspace exists (when login throw invite link)
      yield put(push(Routes.Workspace.replace(':hash', payload.workspace.hash)));
    } else if (user && user.workspaces.length > 0) {
      yield put(push(Routes.Workspace.replace(':hash', user.workspaces[0].hash)));
    } else {
      yield put(push(Routes.AddWorkspace));
    }

    yield put(fetchUserRoutine.success(user));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

function* loginUserRequest({ payload }: Routine<any>) {
  try {
    const { accessToken, refreshToken, user }: IAuthServerResponse = yield call(login, payload);
    setTokens({ accessToken, refreshToken });

    // TODO: rewrite if else

    if (payload.workspace.id) { // selected workspace exists (when login throw invite link)
      yield put(push(Routes.Workspace.replace(':hash', payload.workspace.hash)));
    } else if (user && user.workspaces.length > 0) {
      yield put(push(Routes.Workspace.replace(':hash', user.workspaces[0].hash)));
    } else {
      yield put(push(Routes.AddWorkspace));
    }
    yield put(loginUserRoutine.success(user));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(loginUserRoutine.failure(error.message));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(loginUserRoutine.TRIGGER, loginUserRequest);
}

function* updateProfile({ payload }: Routine<any>) {
  try {
    const response = yield call(editUser, payload);
    const data = {
      ...response
    };
    yield put(editProfileRoutine.success(data));
    yield put(showModalRoutine({ modalType: ModalTypes.EditProfile, show: false }));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(editProfileRoutine.failure(error.message));
  }
}

function* watchUpdateProfile() {
  yield takeEvery(editProfileRoutine.TRIGGER, updateProfile);
}

function* deleteAccount() {
  try {
    yield call(deleteUser);
    yield put(deleteAccountRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
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
    const { accessToken, refreshToken, user }: IAuthServerResponse = yield call(registration, payload);
    setTokens({ accessToken, refreshToken });
    yield put(addNewUserRoutine.success(user));
    yield put(push(Routes.AddWorkspace));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addNewUserRoutine.failure(error.message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

function* forgotPasswordRequest({ payload }: Routine<any>) {
  try {
    yield call(forgotPassword, payload);
    yield put(forgotPasswordRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(forgotPasswordRoutine.failure(error.message));
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(forgotPasswordRoutine.TRIGGER, forgotPasswordRequest);
}

function* resetPasswordRequest({ payload }: Routine<any>) {
  try {
    const { token, password } = payload;
    yield call(resetPassword, password, token);
    yield put(push(Routes.SignIn));
    yield put(resetPasswordRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(resetPasswordRoutine.failure(error.message));
  }
}

function* watchResetPasswordRequest() {
  yield takeEvery(resetPasswordRoutine.TRIGGER, resetPasswordRequest);
}

function* editStatusRequest({ payload }: Routine<any>) {
  try {
    const { id, status } = payload;
    const response = yield call(editStatus, { id, status });
    yield put(editStatusRoutine.success(response));
  } catch (error) {
    yield put(editStatusRoutine.failure(error.message));
  }
}

function* watchEditStatusRequest() {
  yield takeEvery(editStatusRoutine.TRIGGER, editStatusRequest);
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
    watchEditStatusRequest()
  ]);
}
