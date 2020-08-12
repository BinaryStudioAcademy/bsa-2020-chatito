import { createChatRoutine } from '../routines/chat';
import { Routine } from 'redux-saga-routines';
import { IChat } from 'common/models/chat/IChat';

export interface IChatState {
  chat?: IChat;
  loading: boolean;
  error: any;
}

const initialState: IChatState = {
  loading: false,
  error: ''
};

const reducer = (state = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case createChatRoutine.TRIGGER:
      return {
        ...state, chat: payload, loading: true
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
