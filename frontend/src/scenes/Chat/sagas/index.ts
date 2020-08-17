import { all, put, call, takeEvery } from 'redux-saga/effects';
import { setCurrentChatRoutine, setPostsRoutine, addPostRoutine, createChatRoutine } from '../routines';
import { Routine } from 'redux-saga-routines';
import { fetchCnannelPosts, addPost, createChat } from 'services/chatServise';
import { IPost } from 'common/models/post/IPost';
import { toastrError } from 'services/toastrService';
import { showModalRoutine } from 'routines/modal';

function* fetchChannelsPostsRequest({ payload }: Routine<any>): Routine<any> {
  try {
    const response: IPost[] = yield call(fetchCnannelPosts, payload);
    yield put(setPostsRoutine.success(response));
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
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchAddPostRequest() {
  yield takeEvery(addPostRoutine.TRIGGER, fetchAddPostRequest);
}

function* setCurrChat({ payload }: Routine<any>): Routine<any> {
  if (payload && payload.id) {
    yield put(setPostsRoutine.trigger(payload.id));
  }
  yield put(setCurrentChatRoutine.success(payload));
}

function* watchCurrChat() {
  yield takeEvery(setCurrentChatRoutine.TRIGGER, setCurrChat);
}

function* toggleCreateChatModal({ payload }: Routine<any>) {
  yield call(showModalRoutine, payload);
}

function* watchToggleCreateChatModal() {
  yield takeEvery(showModalRoutine.TRIGGER, toggleCreateChatModal);
}

function* createChatRequest({ payload }: Routine<any>) {
  try {
    const chat = yield call(createChat, payload);
    yield put(createChatRoutine.success(chat));
    yield put(showModalRoutine({ modalType: payload.type, show: false }));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(createChatRoutine.failure());
  }
}

function* watchCreateChatRequest() {
  yield takeEvery(createChatRoutine.TRIGGER, createChatRequest);
}

export default function* chatSaga() {
  yield all([
    watchPostsRequest(),
    watchCurrChat(),
    watchAddPostRequest(),
    watchCreateChatRequest(),
    watchToggleCreateChatModal()
  ]);
}
