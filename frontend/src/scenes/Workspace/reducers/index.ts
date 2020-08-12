import { Routine } from 'redux-saga-routines';
import {
  selectWorkspaceRoutine,
  fetchUserChatsRoutine
} from '../routines';

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
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  channels: [],
  directMessages: []
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case selectWorkspaceRoutine.TRIGGER:
      return {
        ...state,
        workspace: payload
      };
    case fetchUserChatsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUserChatsRoutine.SUCCESS:
      return {
        ...state,
        channels: payload.filter((chat: IChat) => chat.type === ChatType.Channel),
        directMessages: payload.filter((chat: IChat) => chat.type === ChatType.DirectMessage),
        loading: false
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
