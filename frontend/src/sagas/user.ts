import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchUserRoutine, editProfile } from '../routines/user';
import { Routine } from 'redux-saga-routines';
import { hideEditModal } from '../containers/EditProfile/routines';

import api from '../common/helpers/apiHelper';

function* fetchUserRequest() {
  try {
    const response = yield call(() => 'implement service');
    yield put(fetchUserRoutine.success(response));
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
    yield put(editProfile.success(data));
  } catch (error) {
    yield put(editProfile.failure(error.message));
  } finally {
    yield put(hideEditModal.trigger());
  }
}

function* watchUpdateProfile() {
  yield takeEvery(editProfile.TRIGGER, updateProfile);
}

export default function* userSaga() {
  yield all([
    watchUserRequest(),
    watchUpdateProfile()
  ]);
}
