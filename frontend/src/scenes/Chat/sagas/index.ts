import { all, put, call, takeEvery } from 'redux-saga/effects';
import { setCurrentChatRoutine, setPostsRoutine, addPostRoutine } from '../routines';
import api from 'common/helpers/apiHelper';
import { Routine } from 'redux-saga-routines';
import { fetchCnannelPosts, addPost } from 'services/channelService';
import { IChat } from 'common/models/chat/IChat';
import { IPost } from 'common/models/post/IPost';
import { toastrError } from 'services/toastrService';

function* fetchChannelsPostsRequest({ payload }: Routine<any>): Routine<any> {
  try {
    let responce: IPost[] | true = yield call(fetchCnannelPosts, payload);
    responce = [
      {
        user: {},
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
    console.log('TEXT');
    console.log(payload);
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
