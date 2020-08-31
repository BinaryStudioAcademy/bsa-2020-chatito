import {
  getUnreadPosts,
  deleteUnreadPosts,
  markPostAsUnread
} from 'services/userService';
import {
  addWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchWorkspaceChatsRoutine,
  fetchPostCommentsRoutine,
  fetchWorkspaceUsersRoutine,
  fetchUnreadUserPostsRoutine,
  readPostRoutine,
  markAsUnreadWithOptionRoutine
} from 'scenes/Workspace/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addWorkspace, getWorkspaceUsers } from 'services/workspaceService';
import { fetchPostComments } from 'services/threadsService';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { fetchWorkspaceChats } from 'services/chatService';
import { toastrError } from 'services/toastrService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
    yield put(push(Routes.Workspace.replace(':whash', workspace.hash)));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}

function* fetchPostCommentsRequest({ payload }: Routine<any>) {
  try {
    const comments = yield call(fetchPostComments, payload);
    yield put(fetchPostCommentsRoutine.success(comments));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchPostCommentsRoutine.failure());
  }
}

function* watchFetchPostCommentsRequest() {
  yield takeEvery(fetchPostCommentsRoutine.TRIGGER, fetchPostCommentsRequest);
}

function* setActiveThread({ payload }: Routine<any>) {
  try {
    const { id } = payload;
    yield put(fetchPostCommentsRoutine.trigger(id));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(setActiveThreadRoutine.failure());
  }
}

function* watchSetActiveThread() {
  yield takeEvery(setActiveThreadRoutine.TRIGGER, setActiveThread);
}

function* fetchWorkspaceChatsRequest({ payload }: Routine<any>) {
  try {
    const response = yield call(fetchWorkspaceChats, payload.workspaceId);
    yield put(fetchWorkspaceChatsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchWorkspaceChatsRoutine.failure(error.message));
  }
}

function* watchFetchUserChatsRequest() {
  yield takeEvery(fetchWorkspaceChatsRoutine.TRIGGER, fetchWorkspaceChatsRequest);
}

function* fetchWorkspaceUsers({ payload }: Routine<any>) {
  try {
    const users = yield call(getWorkspaceUsers, payload);
    yield put(fetchWorkspaceUsersRoutine.success(users));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchWorkspaceUsersRoutine.failure(error));
  }
}

function* watchFetchWorkspaceUsers() {
  yield takeEvery(fetchWorkspaceUsersRoutine.TRIGGER, fetchWorkspaceUsers);
}

function* fetchUnreadUserPosts({ payload }: Routine<any>) {
  try {
    const unreadUserPosts = yield call(getUnreadPosts, payload);
    yield put(fetchUnreadUserPostsRoutine.success(unreadUserPosts));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchUnreadUserPostsRoutine.failure(error));
  }
}

function* watchfetchUnreadUserPosts() {
  yield takeEvery(fetchUnreadUserPostsRoutine.TRIGGER, fetchUnreadUserPosts);
}

function* readPost({ payload }: Routine<any>) {
  try {
    yield call(deleteUnreadPosts, payload.postIdsToDelete);
    yield put(readPostRoutine.success(payload.unreadChatsCopy));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(readPostRoutine.failure(error));
  }
}

function* watchReadPostRoutine() {
  yield takeEvery(readPostRoutine.TRIGGER, readPost);
}

function* markAsUnreadPost({ payload }: Routine<any>) {
  try {
    console.log(payload);
    yield call(markPostAsUnread, payload.unreadPost.id);
    yield put(markAsUnreadWithOptionRoutine.success(payload));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchMarkAsUnreadPost() {
  yield takeEvery(markAsUnreadWithOptionRoutine.TRIGGER, markAsUnreadPost);
}

export default function* workspaceSaga() {
  yield all([
    watchPostWorkspaceName(),
    watchFetchPostCommentsRequest(),
    watchSetActiveThread(),
    watchFetchUserChatsRequest(),
    watchFetchWorkspaceUsers(),
    watchfetchUnreadUserPosts(),
    watchReadPostRoutine(),
    watchMarkAsUnreadPost()
  ]);
}
