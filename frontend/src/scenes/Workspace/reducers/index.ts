import { Routine } from 'redux-saga-routines';
import {
  selectChatRoutine,
  selectWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchPostCommentsRoutine,
  showRightSideMenuRoutine,
  showUserProfileRoutine,
  fetchUserChatsRoutine,
  incUnreadCountRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/chat/IChat';
import { IActiveThread } from 'common/models/thread/IActiveThread';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { ChatType } from 'common/enums/ChatType';
import { IUser } from 'common/models/user/IUser';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  users?: Array<IUser>;
  showRightSideMenu: RightMenuTypes;
  activeThread: IActiveThread | null;
  userProfile: IUser;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  channels: [],
  directMessages: [],
  users: [],
  showRightSideMenu: RightMenuTypes.None,
  activeThread: null,
  userProfile: { id: '', email: '', fullName: '', displayName: '' }
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
        channels: payload.channels,
        directMessages: payload.directMessages,
        loading: false
      };
    case fetchUserChatsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case showRightSideMenuRoutine.TRIGGER:
      return {
        ...state,
        showRightSideMenu: payload,
        activeThread: null
      };
    case setActiveThreadRoutine.TRIGGER:
      return {
        ...state,
        showRightSideMenu: RightMenuTypes.Thread,
        activeThread: { post: payload }
      };
    case showUserProfileRoutine.TRIGGER:
      return {
        ...state,
        showRightSideMenu: RightMenuTypes.Profile,
        userProfile: {},
        activeThread: null
      };
    case fetchPostCommentsRoutine.SUCCESS:
      return {
        ...state,
        activeThread: { ...state.activeThread, comments: payload }
      };
    case incUnreadCountRoutine.TRIGGER: {
      const { chatId } = payload;
      const channels = [ ...state.channels ].map(channel => {
        return chatId === channel.id
        ? { ...channel, unreadCount: channel.unreadCount + 1 }
        : channel
      });
      const directMessages = [ ...state.directMessages ].map(direct => {
        return chatId === direct.id
        ? { ...direct, unreadCount: direct.unreadCount + 1 }
        : direct
      });
      return { ...state, channels, directMessages }
    }
    default:
      return state;
  }
};

export default workspace;
