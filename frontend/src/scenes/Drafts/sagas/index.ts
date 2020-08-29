import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchDraftsRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { toastrError } from 'services/toastrService';
import { IDraftRequest } from 'common/models/draft/IDraftRequest';
import { fetchDrafts } from 'services/draftService';

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

export default function* chatSaga() {
  yield all([
    watchPostsRequest()
  ]);
}
