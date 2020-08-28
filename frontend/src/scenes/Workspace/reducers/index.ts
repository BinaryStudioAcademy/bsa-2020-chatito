import { IPost } from 'common/models/post/IPost';
import { IUnreadChat } from 'common/models/chat/IUnreadChats';
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
  updateChatDraftPostRoutine,
  newUserNotificationWithSocketRoutine,
  markAsUnreadWithSocketRoutine,
  fetchUnreadUserPostsRoutine,
  readPostRoutine } from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/chat/IChat';
import { IActiveThread } from 'common/models/thread/IActiveThread';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { IUser } from 'common/models/user/IUser';
import { addChatWithSocketRoutine } from 'scenes/Chat/routines';
import { ChatType } from 'common/enums/ChatType';
import {
  upsertDraftCommentWithSocketRoutine,
  deleteDraftCommentWithSocketRoutine
} from 'containers/Thread/routines';

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
  threadLoading: boolean;
  someField: string;
  unreadChats: IUnreadChat[];
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
  userProfile: { id: '', email: '', fullName: '', displayName: '' },
  threadLoading: false,
  someField: 'string',
  unreadChats: []
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
    case upsertDraftCommentWithSocketRoutine.TRIGGER:
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
    case deleteDraftCommentWithSocketRoutine.TRIGGER:
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
    case fetchPostCommentsRoutine.TRIGGER:
      return {
        ...state,
        threadLoading: true
      };
    case fetchPostCommentsRoutine.SUCCESS: {
      return {
        ...state,
        activeThread: { ...state.activeThread, comments: payload } as IActiveThread,
        threadLoading: false
      };
    }
    case fetchPostCommentsRoutine.FAILURE:
      return {
        ...state,
        threadLoading: false
      };
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
    case newUserNotificationWithSocketRoutine.TRIGGER: {
      const chatTypeKey = payload.chatType === ChatType.Channel ? 'channels' : 'directMessages';
      const workspaceChatsCopy = state[chatTypeKey];
      workspaceChatsCopy.forEach(chat => {
        if (chat.id === payload.chatId) {
          chat.users.push(...payload.users);
        }
      });
      if (chatTypeKey === 'channels') {
        return {
          ...state, channels: workspaceChatsCopy
        };
      }
      if (chatTypeKey === 'directMessages') {
        return {
          ...state, directMessages: workspaceChatsCopy
        };
      }
      return state;
    }
    case markAsUnreadWithSocketRoutine.TRIGGER: {
      const unreadChatsCopy = state.unreadChats;
      let currentChatExist = false;
      if (unreadChatsCopy.length) {
        unreadChatsCopy.forEach(unreadChat => {
          if (unreadChat.id === payload.chatId) {
            currentChatExist = true;
            unreadChat.unreadPosts.push(payload.unreadPost);
          }
        });
      }
      if (!currentChatExist) {
        unreadChatsCopy.push({ id: payload.chatId, unreadPosts: [payload.unreadPost] });
      }
      return {
        ...state, unreadChats: [...unreadChatsCopy]
      };
    }
    case fetchUnreadUserPostsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUnreadUserPostsRoutine.SUCCESS: {
      const unreadPosts: IPost[] = [...payload.unreadPosts];
      const unreadChats = [...state.unreadChats];
      if (unreadPosts.length) {
        unreadPosts.forEach(unreadPost => {
          let chatExists = false;
          if (unreadChats.length) {
            unreadChats.forEach(unreadChat => {
              if (unreadPost.chatId === unreadChat.id) {
                unreadChat.unreadPosts.push(unreadPost);
                chatExists = true;
              }
            });
          }
          if (!chatExists) {
            unreadChats.push({ id: unreadPost.chatId!, unreadPosts: [unreadPost] });
          }
        });
      }
      unreadChats.forEach(unreadChat => {
        unreadChat.unreadPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
      return {
        ...state, loading: false, unreadChats
      };
    }
    case fetchUnreadUserPostsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case readPostRoutine.TRIGGER:
    case readPostRoutine.SUCCESS: {
      const postId = payload;
      const unreadChats = [...state.unreadChats];
      unreadChats.forEach((unreadChat, chatIndex) => {
        const unreadPostCopy = unreadChat.unreadPosts;
        unreadChat.unreadPosts.forEach((unreadPost, index) => {
          if (unreadPost.id === postId) {
            unreadPostCopy.splice(0, index + 1);
          }
        });
        unreadChats[chatIndex].unreadPosts = [...unreadPostCopy];
      });
      return {
        ...state, unreadChats
      };
    }
    case readPostRoutine.FAILURE:
    default:
      return state;
  }
};

export default workspace;
