import { Routine } from 'redux-saga-routines';
import { fetchDraftsRoutine } from '../routines';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IDraftComment } from 'common/models/draft/IDraftComment';

export interface IDraftState {
  posts: IDraftPost[];
  comments: IDraftComment[];
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
      const chat = payload ? { ...payload } : null;
      console.log('Payload');
      console.log(payload);

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

