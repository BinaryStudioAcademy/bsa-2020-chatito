import { all, put, call, takeEvery } from 'redux-saga/effects';
import { fetchDraftsRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { toastrError } from 'services/toastrService';
import { IDraftRequest } from 'common/models/draft/IDraftRequest';
import { fetchDrafts } from 'services/draftsService';

function* fetchDraftsRequest(): Routine<any> {
  try {
    console.log('saga');

    const response: IDraftRequest = yield call(fetchDrafts);
    console.log('response');

    console.log(response);

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
