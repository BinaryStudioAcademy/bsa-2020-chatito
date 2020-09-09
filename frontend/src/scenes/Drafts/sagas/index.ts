import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchDraftsRoutine, openThreadRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { toastrError } from 'services/toastrService';
import { IDraftRequest } from 'common/models/draft/IDraftRequest';
import { fetchDrafts } from 'services/draftService';
import { getById as getPostById } from 'services/postService';
import { setActiveThreadRoutine } from 'scenes/Workspace/routines';

function* fetchDraftsRequest({ payload }: any): Routine<any> {
  try {
    const response: IDraftRequest = yield call(fetchDrafts, payload);
    yield put(fetchDraftsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchPostsRequest() {
  yield takeEvery(fetchDraftsRoutine.TRIGGER, fetchDraftsRequest);
}

function* fetchPostAndOpenThread({ payload }: any): Routine<any> {
  try {
    const post = yield call(getPostById, payload);
    yield put(setActiveThreadRoutine.trigger(post));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchOpenThread() {
  yield takeEvery(openThreadRoutine.TRIGGER, fetchPostAndOpenThread);
}

export default function* chatSaga() {
  yield all([
    watchPostsRequest(),
    watchOpenThread()
  ]);
}
