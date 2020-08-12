import { Routine } from 'redux-saga-routines';
import {
  selectChatRoutine,
  selectWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchPostCommentsRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';
import { IActiveThread } from 'common/models/thread/IActiveThread';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  activeThread: IActiveThread;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '' },
  loading: false,
  error: '',
  selectedChat: { id: '', name: '', isPrivate: false },
  channels: [],
  directMessages: [],
  activeThread: { post: { id: '', user: {}, text: '', createdAt: new Date() }, comments: [] }
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
    case setActiveThreadRoutine.TRIGGER:
      return {
        ...state,
        activeThread: { post: payload }
      };
    case fetchPostCommentsRoutine.SUCCESS:
      return {
        ...state,
        activeThread: { ...state.activeThread, comments: payload }
      };
    default:
      return state;
  }
};

export default workspace;
