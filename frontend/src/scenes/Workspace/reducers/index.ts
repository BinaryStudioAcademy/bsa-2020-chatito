import { Routine } from 'redux-saga-routines';
import {
  selectChatRoutine,
  selectWorkspaceRoutine,
  fetchUserChatsRoutine
} from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';
import { IUser } from 'common/models/user/IUser';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  users?: Array<IUser>;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  selectedChat: { id: '', name: '', isPrivate: false },
  channels: [],
  directMessages: [],
  users: []
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case selectChatRoutine.TRIGGER:
      return {
        ...state,
        selectedChat: payload
      };
    case selectWorkspaceRoutine.TRIGGER: {
      return {
        ...state,
        workspace: payload
      };
    }
    case fetchUserChatsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUserChatsRoutine.SUCCESS:
      return {
        ...state, channels: payload.channels, directs: payload.directs, loading: false
      };
    case fetchUserChatsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default workspace;
