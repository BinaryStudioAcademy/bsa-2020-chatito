import { Routine } from 'redux-saga-routines';
import { setCurrentChatRoutine,
  setPostsRoutine,
  createChatRoutine,
  addPostWithSocketRoutine,
  editPostWithSocketRoutine,
  fetchChatUsersRoutine,
  removeUserFromChatRoutine } from '../routines';
import { IChat } from 'common/models/chat/IChat';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';

export interface IChatState {
  chat?: IChat;
  posts: IPost[];
  users?: IUser[];
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
    case fetchChatUsersRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchChatUsersRoutine.SUCCESS:
      return {
        ...state, users: payload, loading: false
      };
    case fetchChatUsersRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case removeUserFromChatRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case removeUserFromChatRoutine.SUCCESS:
      const newUserList = state.users?.filter(user => user.id !== payload);
      return {
        ...state, users: newUserList, loading: false
      };
    case removeUserFromChatRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default reducer;

