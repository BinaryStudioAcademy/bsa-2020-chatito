import { Routine } from 'redux-saga-routines';
import {
  selectWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchPostCommentsRoutine,
  showRightSideMenuRoutine,
  showUserProfileRoutine,
  fetchWorkspaceChatsRoutine,
  incUnreadCountRoutine,
  fetchWorkspaceUsersRoutine,
  addActiveCommentWithSocketRoutine,
  updateChatDraftPostRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/chat/IChat';
import { IActiveThread } from 'common/models/thread/IActiveThread';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { IUser } from 'common/models/user/IUser';
import { addChatWithSocketRoutine } from 'scenes/Chat/routines';
import { ChatType } from 'common/enums/ChatType';
import { upsertDraftCommentRoutine, deleteDraftCommentRoutine } from 'containers/Thread/routines';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  users: Array<IUser>;
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

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>): IWorkspaceState => {
  switch (type) {
    case selectWorkspaceRoutine.TRIGGER:
      return {
        ...state,
        workspace: payload
      };
    case fetchWorkspaceChatsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchWorkspaceChatsRoutine.SUCCESS:
      return {
        ...state,
        channels: payload.channels || [],
        directMessages: payload.directMessages || [],
        loading: false
      };
    case fetchWorkspaceChatsRoutine.FAILURE:
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
        activeThread: { ...state.activeThread, post: payload, comments: [] }
      };
    case upsertDraftCommentRoutine.SUCCESS:
      if (state.activeThread) {
        return {
          ...state,
          activeThread: {
            ...state.activeThread,
            post: {
              ...state.activeThread.post,
              draftComments: [
                payload
              ]
            }
          }
        };
      }
      return { ...state };
    case deleteDraftCommentRoutine.SUCCESS:
      if (state.activeThread) {
        return {
          ...state,
          activeThread: {
            ...state.activeThread,
            post: {
              ...state.activeThread?.post,
              draftComments: []
            }
          }
        };
      }
      return { ...state };
    case updateChatDraftPostRoutine.TRIGGER:
      const { chatId: updateChatId, id, text } = payload;
      const draftPosts = id ? [{ id, text }] : [];

      const updatedChannels = state.channels.map(channel => (
        channel.id === updateChatId
          ? { ...channel, draftPosts }
          : channel
      ));

      const updatedDirectMessages = state.directMessages.map(directMessage => (
        directMessage.id === updateChatId
          ? { ...directMessage, draftPosts }
          : directMessage
      ));

      return {
        ...state,
        channels: updatedChannels,
        directMessages: updatedDirectMessages
      };
    case showUserProfileRoutine.TRIGGER:
      return {
        ...state,
        showRightSideMenu: RightMenuTypes.Profile,
        userProfile: { ...payload }
      };
    case fetchPostCommentsRoutine.SUCCESS: {
      if (state.activeThread) {
        return {
          ...state,
          activeThread: { ...state.activeThread, comments: payload }
        };
      }
      return { ...state };
    }
    case incUnreadCountRoutine.TRIGGER: {
      const { chatId } = payload;
      const channels = [...state.channels].map(channel => (
        chatId === channel.id
          ? { ...channel, unreadCount: (channel.unreadCount || 0) + 1 }
          : channel
      ));
      const directMessages = [...state.directMessages].map(direct => (
        chatId === direct.id
          ? { ...direct, unreadCount: (direct.unreadCount || 0) + 1 }
          : direct
      ));
      return { ...state, channels, directMessages };
    }
    case addChatWithSocketRoutine.TRIGGER: {
      const newChat = payload;
      if (newChat.type === ChatType.Channel) {
        const channels = [...state.channels];
        channels.push(newChat);
        return { ...state, channels };
      }
      if (newChat.type === ChatType.DirectMessage) {
        const directMessages = [...state.directMessages];
        directMessages.push(newChat);
        return { ...state, directMessages };
      }
      return state;
    }
    case fetchWorkspaceUsersRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchWorkspaceUsersRoutine.SUCCESS:
      return {
        ...state, users: payload, loading: false
      };
    case fetchWorkspaceUsersRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addActiveCommentWithSocketRoutine.TRIGGER: {
      const thread = state.activeThread;
      if (thread) {
        const comments = [...thread.comments];
        comments.push(payload);
        return { ...state, activeThread: { ...thread, comments } };
      }
      return state;
    }
    default:
      return state;
  }
};

export default workspace;
