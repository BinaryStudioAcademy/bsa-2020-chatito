import { Routine } from 'redux-saga-routines';
import {
  selectChatRoutine,
  selectWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchPostCommentsRoutine,
  showRightSideMenuRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/workstate/chat';
import { IActiveThread } from 'common/models/thread/IActiveThread';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  selectedChat: IChat;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  showRightSideMenu: RightMenuTypes;
  activeThread: IActiveThread;
}

const activeThreadInitialState = {
  post:
    { id: '',
      user: {
        id: '',
        email: '',
        fullName: '',
        displayName: ''
      },
      text: '',
      createdAt: new Date() },
  comments: [] };
const selectedChatInitialState = { id: '', name: '', isPrivate: false };
const workspaceInitialState = { id: '', name: '', hash: '', imageUrl: '' };

const initialState: IWorkspaceState = {
  workspace: workspaceInitialState,
  loading: false,
  error: '',
  selectedChat: selectedChatInitialState,
  channels: [],
  directMessages: [],
  showRightSideMenu: RightMenuTypes.None,
  activeThread: activeThreadInitialState
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
    case showRightSideMenuRoutine.TRIGGER:
      return {
        ...state,
        showRightSideMenu: payload,
        activeThread: activeThreadInitialState
      };
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
