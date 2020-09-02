import { Routine } from 'redux-saga-routines';
import { fetchDraftsRoutine } from '../routines';
import { IDraftClient } from 'common/models/draft/IDraftClient';
import { usertDraftsPagePostRoutine, deleteDraftPostFromDraftsRoutine } from 'scenes/Chat/routines';
import { upsertDraftPageCommentRoutine, deleteDraftCommentFromDraftsRoutine } from 'containers/Thread/routines';

export interface IDraftState {
  posts: IDraftClient[];
  comments: IDraftClient[];
  loading: boolean;
  error: any;
}

const initialState: IDraftState = {
  posts: [],
  comments: [],
  loading: false,
  error: ''
};

const reducer = (state: IDraftState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case fetchDraftsRoutine.SUCCESS:
      return {
        ...state,
        posts: payload.posts || [],
        comments: payload.comments || [],
        loading: false
      };
    case fetchDraftsRoutine.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case usertDraftsPagePostRoutine.TRIGGER:
      const postsCopy = [...state.posts];
      const postIndex = postsCopy.findIndex(p => p.id === payload.id);
      if (postIndex !== -1) {
        postsCopy[postIndex] = payload;
      } else {
        postsCopy.push(payload);
      }
      return {
        ...state,
        posts: postsCopy
      };

    case upsertDraftPageCommentRoutine.TRIGGER:
      const commentsCopy = [...state.posts];
      const commentIndex = commentsCopy.findIndex(p => p.id === payload.id);
      if (commentIndex !== -1) {
        commentsCopy[commentIndex] = payload;
      } else {
        commentsCopy.push(payload);
      }
      return {
        ...state,
        posts: commentsCopy
      };
    case deleteDraftPostFromDraftsRoutine.TRIGGER:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== payload.id)
      };
    case deleteDraftCommentFromDraftsRoutine.TRIGGER:
      return {
        ...state,
        comments: state.comments.filter(c => c.postId !== payload)
      };
    default:
      return state;
  }
};

export default reducer;

