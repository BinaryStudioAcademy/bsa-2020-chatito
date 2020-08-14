import { Routine } from 'redux-saga-routines';
import { setCurrentChatRoutine, setPostsRoutine, createChatRoutine } from '../routines';
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
    default:
      return state;
  }
};

export default reducer;

