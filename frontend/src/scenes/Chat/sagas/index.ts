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
  upsertDraftPostRoutine,
  deleteDraftPostRoutine
} from '../routines';
import { Routine } from 'redux-saga-routines';
import {
  fetchChatPosts,
  addPost,
  createChat,
  fetchChatUsers,
  removeUserFromChat,
  addUsersToChat
} from 'services/chatService';
import { IPost } from 'common/models/post/IPost';
import { toastrError, toastrSuccess } from 'services/toastrService';
import { showModalRoutine } from 'routines/modal';
import { IUser } from 'common/models/user/IUser';
import { addReminder } from 'services/reminderService';
import { upsertDraftPost, deleteDraftPost } from 'services/draftService';
import { updateChatDraftPostRoutine } from 'scenes/Workspace/routines';

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
    const response = yield call(upsertDraftPost, payload);
    yield put(updateChatDraftPostRoutine.trigger({ ...response, chatId: payload.chatId }));

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
    yield call(deleteDraftPost, payload);
    yield put(updateChatDraftPostRoutine.trigger(payload));

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
  yield takeEvery(addReminderRoutine.TRIGGER, removeUserFromChatRequest);
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
    watchCreateReminderRequest()
  ]);
}
