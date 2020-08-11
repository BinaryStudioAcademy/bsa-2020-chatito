import { Routine } from 'redux-saga-routines';
import { addWorkspaceRoutine, selectChatRoutine, fetchChannelsRoutine, selectWorkspaceRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { ChatType } from 'common/enums/ChatType';
import { IChat } from 'common/models/chat/IChat';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '' },
  loading: false,
  error: '',
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
    case selectWorkspaceRoutine.TRIGGER:
      return {
        ...state,
        workspace: payload
      };
    case fetchChannelsRoutine.SUCCESS:
      return {
        ...state,
        channels: payload.filter((chat: IChat) => chat.type === ChatType.Channel),
        directMessages: payload.filter((chat: IChat) => chat.type === ChatType.DirectMessage)
      };

    case addWorkspaceRoutine.SUCCESS: {
      const addWorkspace = { ...payload };

      return {
        ...state,
        workspace: addWorkspace
      };
    }
    default:
      return state;
  }
};

export default workspace;
