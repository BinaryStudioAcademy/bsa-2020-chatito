import { Routine } from 'redux-saga-routines';
import { setCurrentChatRoutine,
  setPostsRoutine,
  createChatRoutine,
  addPostWithSocketRoutine,
  editPostWithSocketRoutine,
  addChatWithSocketRoutine } from '../routines';
import { IChat } from 'common/models/chat/IChat';
import { IPost } from 'common/models/post/IPost';

export interface IChatState {
  chat?: IChat;
  posts: IPost[];
  loading: boolean;
  error: any;
}

const initialState: IChatState = {
  posts: [],
  loading: false,
  error: ''
};

const reducer = (state: IChatState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case setCurrentChatRoutine.SUCCESS:
      return {
        ...state,
        chat: { ...payload }
      };

    case setPostsRoutine.SUCCESS:
      return {
        ...state,
        posts: payload
      };
    case createChatRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case createChatRoutine.SUCCESS:
      return {
        ...state, chat: payload, loading: false
      };
    case createChatRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addPostWithSocketRoutine.TRIGGER: {
      const posts = [...state.posts];
      posts.push(payload);
      return {
        ...state, posts
      };
    }
    case editPostWithSocketRoutine.TRIGGER: {
      const editedPost = payload;
      const posts = [...state.posts].map(post => (post.id === editedPost.id ? editedPost : post));
      return {
        ...state, posts
      };
    }
    case addChatWithSocketRoutine.TRIGGER: {
      return {
        ...state,
        chat: { ...payload },
        posts: payload.posts
      };
    }
    default:
      return state;
  }
};

export default reducer;

