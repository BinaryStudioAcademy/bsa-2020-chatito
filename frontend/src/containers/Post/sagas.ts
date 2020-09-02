import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { addPostReactionRoutine, deletePostReactionRoutine } from 'containers/Post/routines';
import { addReaction, deleteReaction } from 'services/postService';

function* addPostReaction({ payload }: Routine<any>) {
  try {
    yield put(addPostReactionRoutine.success(payload.post));

    yield call(addReaction, { postId: payload.post.id, reaction: payload.reaction });
  } catch (error) {
    yield call(toastr.error, 'Error', 'Add reaction was failed. Please try again later.');
  }
}

function* watchAddPostReaction() {
  yield takeEvery(addPostReactionRoutine.TRIGGER, addPostReaction);
}

function* deletePostReaction({ payload }: Routine<any>) {
  try {
    yield put(deletePostReactionRoutine.success(payload.post));

    yield call(deleteReaction, { postId: payload.post.id, reaction: payload.reaction });
  } catch (error) {
    yield call(toastr.error, 'Error', 'Delete reaction was failed. Please try again later.');
  }
}

function* watchDeletePostReaction() {
  yield takeEvery(deletePostReactionRoutine.TRIGGER, deletePostReaction);
}

export default function* postSaga() {
  yield all([
    watchAddPostReaction(),
    watchDeletePostReaction()
  ]);
}
