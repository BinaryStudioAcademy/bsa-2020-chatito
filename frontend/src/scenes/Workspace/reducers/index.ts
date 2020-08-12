import { Routine } from 'redux-saga-routines';
import {
  selectChatRoutine,
  selectWorkspaceRoutine,
  fetchUserChannelsRoutine,
  fetchUserDirectsRoutine
} from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  selectedChat: { id: '', name: '', isPrivate: false },
  channels: [],
  directMessages: []
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
    case fetchUserChannelsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUserChannelsRoutine.SUCCESS:
      return {
        ...state, channels: payload, loading: false
      };
    case fetchUserChannelsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchUserDirectsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUserDirectsRoutine.SUCCESS:
      return {
        ...state, directs: payload, loading: false
      };
    case fetchUserDirectsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default workspace;
