import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, selectChatRoutine, fetchChannelsRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { ChatType } from 'common/enums/ChatType';
import { IChat } from 'common/models/chat/IChat';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: any;
  selectedChat: any;
  channels: Array<any>;
  directMessages: Array<any>;
}

const initialState: IWorkspaceState = {
  workspace: {},
  loading: false,
  error: '',
  selectedChat: null,
  channels: [],
  directMessages: []
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case addWorkspaceRoutine.TRIGGER:
      return {
        ...state, workspace: payload, loading: true
      };
    case addWorkspaceRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addWorkspaceRoutine.SUCCESS:
      return {
        ...state, loading: false
      };

    case fetchChannelsRoutine.SUCCESS:
      return {
        ...state,
        channels: payload.filter((chat: IChat) => chat.type === ChatType.Channel),
        directMessages: payload.filter((chat: IChat) => chat.type === ChatType.DirectMessage)
      };

    case selectChatRoutine.TRIGGER:
      return {
        ...state,
        selectedChat: payload
      };
    default:
      return state;
  }
};

export default workspace;
