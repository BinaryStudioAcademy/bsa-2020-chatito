import { createChatRoutine } from 'scenes/Chat/routines';
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

    default:
      return state;
  }
};

export default reducer;
