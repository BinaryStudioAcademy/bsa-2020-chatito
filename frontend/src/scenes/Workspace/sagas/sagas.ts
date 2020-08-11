import { addWorkspaceRoutine, addChatRoutine } from '../routines/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr'
import { addWorkspace } from 'services/workspaceService';
import { addChat } from 'services/chatService';
import { ChatType } from 'common/enums/ChatType';
import { history } from 'common/helpers/historyHelper';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}

function* addChatReq({ payload }: Routine<any>) {
  try {
    const chat = yield call(addChat, payload);
    yield put(addChatRoutine.success(chat));
    switch (chat.type) {
      case ChatType.Channel:
        history.push(`/channel/${chat.id}`);
        break;
      case ChatType.DirectMessage:
        history.push(`/direct/${chat.id}`);
        break;
    }
  } catch (error) {
    yield call(toastr.error, 'Error', error.message);
    yield put(addChatRoutine.failure(error));
  }
}

function* watchPostChat() {
  yield takeEvery(addChatRoutine.TRIGGER, addChatReq);
}
