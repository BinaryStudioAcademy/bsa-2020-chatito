import { Routine } from 'redux-saga-routines';
import { setCurrentChatRoutine, setPostsRoutine } from '../routines';
import { IChat } from 'common/models/chat/IChat';
import { IPost } from 'common/models/post/IPost';

export interface IChatState {
  chat?: IChat;
  posts: IPost[];
}

const initialState: IChatState = {
  posts: []
};

const workspace = (state: IChatState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case setCurrentChatRoutine.TRIGGER:
      return {
        ...state,
        chat: payload
      };

    case setPostsRoutine.SUCCESS:
      return {
        ...state,
        posts: payload
      };

    default:
      return state;
  }
};

export default workspace;
