import { Routine } from 'redux-saga-routines';
import { addPostReactionRoutine, deletePostReactionRoutine } from 'containers/Post/routines';
import { setCurrentChatRoutine,
  setPostsRoutine,
  createChatRoutine,
  addPostWithSocketRoutine,
  editPostWithSocketRoutine } from '../routines';
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
      const chat = payload ? { ...payload } : null;
      return {
        ...state,
        chat
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
    case addPostReactionRoutine.SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (payload.id === post.id) {
            return payload;
          }
          return post;
        })
      };
    case deletePostReactionRoutine.SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (payload.id === post.id) {
            return payload;
          }
          return post;
        })
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
    default:
      return state;
  }
};

export default reducer;

