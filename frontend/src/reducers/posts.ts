import { Routine } from 'redux-saga-routines';
import { fetchPostsRoutine, editPostRoutine } from '../routines/posts';
import { IPost } from '../common/models/post/IPost';

export interface IPostsState {
  isLoading: boolean;
  error: boolean | {};
  data: IPost[] | [];
}

const initialState: IPostsState = {
  isLoading: false,
  error: false,
  data: []
};

const reducer = (state = initialState, { type, payload }: Routine<any>) => {
  switch (type) {

    case fetchPostsRoutine.TRIGGER:
      return { ...state, isLoading: true };

    case fetchPostsRoutine.SUCCESS:
      return {
        ...state,
        data: { ...payload },
        error: false,
        isLoading: false
      };

    case editPostRoutine.TRIGGER: {
      return { ...state, loading: true };
    }

    case editPostRoutine.SUCCESS: {
      return { ...state, error: false, loading: false };
    }

    case editPostRoutine.FAILURE: {
      return { ...state, error: payload.error, loading: false };
    }

    case fetchPostsRoutine.FAILURE: {
      return {
        ...state,
        data: [],
        error: payload.error,
        isLoading: false
      };
    }

    default:
      return state;
  }
};

export default reducer;
