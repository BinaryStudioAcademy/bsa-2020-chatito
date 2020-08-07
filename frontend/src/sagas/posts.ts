import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';

import { fetchPostsRoutine, editPostRoutine } from '../routines/posts'
import { showModalRoutine } from '../routines/modal';
import { ModalTypes } from '../common/enums/ModalTypes';
import { getPosts, editPost } from '../services/postsService';
import { IPost } from '../common/models/post/IPost';

function* fetchPostsRequest(): Routine<any> {
  try {
    const posts: IPost[] = yield call(getPosts);
    yield put({ type: fetchPostsRoutine.SUCCESS, payload: { data: posts } });
  } catch (error) {
    yield put(fetchPostsRoutine.failure(error.message));
  }
}

function* watchPostsRequest() {
  yield takeEvery(fetchPostsRoutine.TRIGGER, fetchPostsRequest);
}

function* editPostRequest({ payload }: Routine<any>) {
  try {
    const response = yield call(editPost, payload);
    const data = {
      ...response
    };
    yield put(editPostRoutine.success(data));
    yield put(showModalRoutine({ modalType: ModalTypes.EditPost, show: false }));
  } catch (error) {
    yield put(editPostRoutine.failure(error.message));
  }
}

function* watchEditPost() {
  yield takeEvery(editPostRoutine.TRIGGER, editPostRequest);
}

export default function* postsSaga() {
  yield all([
    watchPostsRequest(),
    watchEditPost()
  ]);
}
