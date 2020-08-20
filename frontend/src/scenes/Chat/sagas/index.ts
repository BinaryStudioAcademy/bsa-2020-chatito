import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  setCurrentChatRoutine,
  setPostsRoutine,
  addPostRoutine,
  createChatRoutine,
  fetchChatUsersRoutine,
  removeUserFromChatRoutine,
  upsertDraftPostRoutine,
  deleteDraftPostRoutine,
  addUsersToChatRoutine
} from '../routines';
import { Routine } from 'redux-saga-routines';
import {
  fetchChatPosts,
  addPost,
  createChat,
  fetchChatUsers,
  removeUserFromChat,
  fetchUserChats,
  addUsersToChat
} from 'services/chatService';
import { IPost } from 'common/models/post/IPost';
import { toastrError, toastrSuccess } from 'services/toastrService';
import { showModalRoutine } from 'routines/modal';
import { IUser } from 'common/models/user/IUser';
import { upsertDraftPost, deleteDraftPost } from 'services/draftService';
import { fetchUserChatsRoutine } from 'scenes/Workspace/routines';

function* fetchChatPostsRequest({ payload }: Routine<any>): Routine<any> {
  try {
    const response: IPost[] = yield call(fetchChatPosts, payload);
    yield put(setPostsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchPostsRequest() {
  yield takeEvery(setPostsRoutine.TRIGGER, fetchChatPostsRequest);
}

function* upsertDraftPostRequest({ payload }: Routine<any>) {
  try {
    console.log('upsert payload', payload);

    const response = yield call(upsertDraftPost, payload);

    yield put(upsertDraftPostRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchUpsertDraftPostRequest() {
  yield takeEvery(upsertDraftPostRoutine.TRIGGER, upsertDraftPostRequest);
}

function* deleteDraftPostRequest({ payload }: Routine<any>) {
  try {
    console.log('delete triggered saga');

    yield call(deleteDraftPost, payload);

    yield put(deleteDraftPostRoutine.success());
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchDeleteDraftPostRequest() {
  yield takeEvery(deleteDraftPostRoutine.TRIGGER, deleteDraftPostRequest);
}

function* fetchAddPostRequest({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(addPost, payload);

    yield put(deleteDraftPostRoutine.trigger({ chatId: payload.chatId }));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchAddPostRequest() {
  yield takeEvery(addPostRoutine.TRIGGER, fetchAddPostRequest);
}

function* setCurrChat({ payload }: Routine<any>): Routine<any> {
  // TODO: rewrite to load additional indo for current chat (like users[])

  // trigger chats fetch to see draft chats
  const { channels, directMessages } = yield call(fetchUserChats);
  yield put(fetchUserChatsRoutine.success({ channels, directMessages }));

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

function* addUsersToChatRequest({ payload }: Routine<any>) {
  try {
    yield call(addUsersToChat, payload);
    yield call(toastrSuccess, 'Users have been added successfully.');
  } catch (error) {
    yield call(toastrError, 'Adding users was failed. Please try again later.');
  }
}

function* watchAddUsersToChat() {
  yield takeEvery(addUsersToChatRoutine.TRIGGER, addUsersToChatRequest);
}

function* fetchChatUsersRequest({ payload }: Routine<any>) {
  try {
    const users: IUser[] = yield call(fetchChatUsers, payload);
    yield put(fetchChatUsersRoutine.success(users));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchChatUsersRoutine.failure(error.message));
  }
}

function* watchFetchChatUsersRequest() {
  yield takeEvery(fetchChatUsersRoutine.TRIGGER, fetchChatUsersRequest);
}

function* removeUserFromChatRequest({ payload }: Routine<any>) {
  try {
    const { chatId, userId } = payload;
    yield call(removeUserFromChat, chatId, userId);
    yield put(removeUserFromChatRoutine.success(userId));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(removeUserFromChatRoutine.failure(error.message));
  }
}

function* watchRemoveUserFromChat() {
  yield takeEvery(removeUserFromChatRoutine.TRIGGER, removeUserFromChatRequest);
}

export default function* chatSaga() {
  yield all([
    watchPostsRequest(),
    watchCurrChat(),
    watchAddPostRequest(),
    watchUpsertDraftPostRequest(),
    watchDeleteDraftPostRequest(),
    watchCreateChatRequest(),
    watchToggleCreateChatModal(),
    watchAddUsersToChat(),
    watchFetchChatUsersRequest(),
    watchRemoveUserFromChat()
  ]);
}
