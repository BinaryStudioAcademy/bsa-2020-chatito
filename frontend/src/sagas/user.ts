import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchUserRoutine,
  editProfileRoutine,
  addNewUserRoutine,
  deleteAccountRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine,
  editStatusRoutine,
  loginWithGoogleRoutine
} from '../routines/user';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { Routine } from 'redux-saga-routines';
import { registration, login, fetchUser, loginWithGoogle } from 'services/authService';
import { setTokens } from 'common/helpers/storageHelper';
import { editStatus, deleteUser, editUser, forgotPassword, resetPassword } from 'services/userService';
import { toastrError, toastrSuccess } from 'services/toastrService';
import { push } from 'connected-react-router';
import { IUserWithWorkspaces } from 'common/models/user/IUserWithWorkspaces';
import { Routes } from 'common/enums/Routes';
import { connectSockets } from 'services/socketService';

function* fetchUserRequest({ payload }: Routine<any>) {
  try {
    const user: IUserWithWorkspaces = yield call(fetchUser);

    yield put(fetchUserRoutine.success(user));

    // eslint-disable-next-line
    yield payload.workspace.id // selected workspace exists (when login through invite link)
      ? put(push(Routes.Workspace.replace(':whash', payload.workspace.hash)))
      : (user && user.workspaces.length > 0)
        ? put(push(Routes.Workspace.replace(':whash', user.workspaces[0].hash)))
        : put(push(Routes.AddWorkspace));
    yield call(connectSockets);
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

    yield put(loginUserRoutine.success(user));

    // eslint-disable-next-line
    yield payload.workspace.id // selected workspace exists (when login through invite link)
      ? put(push(Routes.Workspace.replace(':whash', payload.workspace.hash)))
      : (user && user.workspaces.length > 0)
        ? put(push(Routes.Workspace.replace(':whash', user.workspaces[0].hash)))
        : put(push(Routes.AddWorkspace));
    yield call(connectSockets);
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(loginUserRoutine.failure(error.message));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(loginUserRoutine.TRIGGER, loginUserRequest);
}

function* loginWithGoogleRequest({ payload }: Routine<any>) {
  try {
    const { accessToken, refreshToken, user }: IAuthServerResponse = yield call(loginWithGoogle, payload);
    setTokens({ accessToken, refreshToken });

    yield put(loginWithGoogleRoutine.success(user));

    // eslint-disable-next-line
    yield payload.workspace.id // selected workspace exists (when login through invite link)
      ? put(push(Routes.Workspace.replace(':whash', payload.workspace.hash)))
      : (user && user.workspaces.length > 0)
        ? put(push(Routes.Workspace.replace(':whash', user.workspaces[0].hash)))
        : put(push(Routes.AddWorkspace));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(loginWithGoogleRoutine.failure(error.message));
  }
}

function* watchLoginWithGoogleRequest() {
  yield takeEvery(loginWithGoogleRoutine.TRIGGER, loginWithGoogleRequest);
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

    yield payload.workspace.id // selected workspace exists (when register through invite link)
      ? put(push(Routes.Workspace.replace(':whash', payload.workspace.hash)))
      : put(push(Routes.AddWorkspace));
    yield call(connectSockets);
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
    yield call(toastrSuccess, 'Check your email');
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
    watchLoginWithGoogleRequest(),
    watchDeleteAccount(),
    watchResetPasswordRequest(),
    watchEditStatusRequest()
  ]);
}
