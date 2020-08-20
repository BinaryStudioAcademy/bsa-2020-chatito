import { Routine } from 'redux-saga-routines';
import { fetchDraftsRoutine } from '../routines';
import { IDraftClient } from 'common/models/draft/IDraftClient';

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
    default:
      return state;
  }
};

export default reducer;

