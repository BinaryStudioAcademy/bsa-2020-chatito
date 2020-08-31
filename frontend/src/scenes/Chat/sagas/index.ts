import { ModalTypes } from 'common/enums/ModalTypes';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  setCurrentChatRoutine,
  setPostsRoutine,
  addPostRoutine,
  createChatRoutine,
  fetchChatUsersRoutine,
  removeUserFromChatRoutine,
  addReminderRoutine,
  addUsersToChatRoutine,
  addReminderSuccessPostRoutine,
  createChatAndAddPostRoutine,
  upsertDraftPostRoutine,
  deleteDraftPostRoutine,
  fetchNavigationPostRoutine
} from '../routines';
import { Routine } from 'redux-saga-routines';
import {
  fetchChatPosts,
  addPost,
  createChat,
  fetchChatUsers,
  removeUserFromChat,
  addUsersToChat,
  fetchNavigationPost
} from 'services/chatService';
import { IPost } from 'common/models/post/IPost';
import { toastrError, toastrSuccess } from 'services/toastrService';
import { showModalRoutine } from 'routines/modal';
import { IUser } from 'common/models/user/IUser';
import { addReminder } from 'services/reminderService';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { upsertDraftPost, deleteDraftPost } from 'services/draftService';
import { removeUserFromChatInWorkspaceRoutine } from 'scenes/Workspace/routines';

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
    yield call(upsertDraftPost, payload);
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchUpsertDraftPostRequest() {
  yield takeEvery(upsertDraftPostRoutine.TRIGGER, upsertDraftPostRequest);
}

function* deleteDraftPostRequest({ payload }: Routine<any>) {
  try {
    yield call(deleteDraftPost, payload);
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
    yield put(removeUserFromChatInWorkspaceRoutine.success({ chatId, userId }));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(removeUserFromChatRoutine.failure(error.message));
  }
}

function* watchRemoveUserFromChat() {
  yield takeEvery(removeUserFromChatRoutine.TRIGGER, removeUserFromChatRequest);
}

function* createReminderRequest({ payload }: Routine<any>) {
  try {
    const reminder = yield call(addReminder, payload);
    yield put(addReminderRoutine.success(reminder));
    yield put(showModalRoutine({ modalType: ModalTypes.SetReminder, show: false }));
    yield put(addReminderSuccessPostRoutine.success(payload));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addReminderRoutine.failure());
  }
}

function* watchCreateReminderRequest() {
  yield takeEvery(addReminderRoutine.TRIGGER, createReminderRequest);
}

function* fetchNavigationPostRequest({ payload }: Routine<any>) {
  try {
    const response = yield call(fetchNavigationPost, payload);
    yield put(fetchNavigationPostRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchNavigationPostRoutine.failure(error.message));
  }
}

function* watchFetchNavigationPost() {
  yield takeEvery(fetchNavigationPostRoutine.TRIGGER, fetchNavigationPostRequest);
}

function* createChatAndAddPost({ payload }: Routine<any>) {
  try {
    const chat = yield call(createChat, payload.chat);
    yield call(addPost, { chatId: chat.id, text: payload.text });
    yield put(createChatRoutine.success(chat));
    yield put(push(Routes.Chat.replace(':whash', chat.workspace.hash).replace(':chash', chat.hash)));
  } catch (error) {
    yield put(createChatAndAddPostRoutine.failure());
    yield call(toastrError, 'Sending message failed. Please try again later.');
  }
}

function* watchCreateChatAndAddPost() {
  yield takeEvery(createChatAndAddPostRoutine.TRIGGER, createChatAndAddPost);
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
    watchRemoveUserFromChat(),
    watchFetchNavigationPost(),
    watchCreateReminderRequest(),
    watchCreateChatAndAddPost()
  ]);
}
