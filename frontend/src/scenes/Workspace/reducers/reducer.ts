import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, userChannelRoutine } from '../routines';
import { IChat } from '../../../common/models/workstate/chat';

export interface IWorkspaceState {
  name: string;
  loading: boolean;
  error: any;
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
}

const initialState: IWorkspaceState = {
  name: '',
  loading: false,
  error: '',
  channels: [],
  directMessages: [],
  selectedChat: { id: '', channelName: '', isPrivate: false }
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addWorkspaceRoutine.TRIGGER:
      return {
        ...state, name: payload, loading: true
      };
    case addWorkspaceRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addWorkspaceRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    case userChannelRoutine.SUCCESS:
      return {
        ...state,
        selectedChat: payload
      };
    default:
      return state;
  }
};

export default workspace;
