import { all, put, call, takeEvery } from 'redux-saga/effects';
import { setCurrentChatRoutine, setPostsRoutine, addPostRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { fetchCnannelPosts, addPost } from 'services/channelService';
import { IPost } from 'common/models/post/IPost';
import { toastrError } from 'services/toastrService';

function* fetchChannelsPostsRequest({ payload }: Routine<any>): Routine<any> {
  try {
    let responce: IPost[] | true = yield call(fetchCnannelPosts, payload);
    responce = [
      {
        user: {
          id: '1',
          email: 'string',
          fullName: 'Test Fullname',
          displayName: 'string',
          imageUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
          title: 'string',
          status: 'online'
        },
        createdAt: new Date(),
        text: 'Message'
      }
    ];
    yield put(setPostsRoutine.success(responce));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchPostsRequest() {
  yield takeEvery(setPostsRoutine.TRIGGER, fetchChannelsPostsRequest);
}

function* fetchAddPostRequest({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(addPost, payload);
    yield put(setPostsRoutine.trigger());
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchAddPostRequest() {
  yield takeEvery(addPostRoutine.TRIGGER, fetchAddPostRequest);
}

function* setCurrChat(): Routine<any> {
  yield put(setPostsRoutine.trigger());
}

function* watchCurrChat() {
  yield takeEvery(setCurrentChatRoutine.TRIGGER, setCurrChat);
}

export default function* chatSaga() {
  yield all([
    watchPostsRequest(),
    watchCurrChat(),
    watchAddPostRequest()
  ]);
}
