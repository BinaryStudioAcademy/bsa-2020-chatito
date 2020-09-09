import { IServerComment } from 'common/models/post/IServerComment';
import { IUnreadPostComments } from 'common/models/post/IUnreadPostComments';
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
  markAsUnreadPostWithSocketRoutine,
  fetchUnreadUserPostsRoutine,
  readPostRoutine,
  markAsUnreadPostWithOptionRoutine,
  markAsUnreadCommentWithSocketRoutine,
  fetchUnreadUserCommentsRoutine,
  readCommentRoutine,
  markAsUnreadCommentWithOptionRoutine,
  removeUserFromChatInWorkspaceRoutine,
  deleteFromChatWithSocketRoutine,
  editCommentWithSocketRoutine,
  deleteCommentWithSocketRoutine
} from '../routines';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/chat/IChat';
import { IActiveThread } from 'common/models/thread/IActiveThread';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { IUser } from 'common/models/user/IUser';
import {
  addChatWithSocketRoutine,
  setChatMuteSocketRoutine,
  editPostWithSocketRoutine,
  deletePostWithSocketRoutine
} from 'scenes/Chat/routines';
import { ChatType } from 'common/enums/ChatType';
import {
  upsertDraftCommentWithSocketRoutine,
  deleteDraftCommentWithSocketRoutine,
  updateActiveInputRoutine
} from 'containers/Thread/routines';
import { InputType } from 'common/enums/InputType';

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
  channels: Array<IChat>;
  directMessages: Array<IChat>;
  githubRepositories: Array<IChat>;
  users: Array<IUser>;
  showRightSideMenu: RightMenuTypes;
  activeThread: IActiveThread | null;
  userProfile: IUser;
  threadLoading: boolean;
  someField: string;
  unreadChats: IUnreadChat[];
  unreadPostComments: IUnreadPostComments[];
  activeInput: InputType.Post | InputType.Comment | null;
}

const initialState: IWorkspaceState = {
  workspace: { id: '', name: '', hash: '', imageUrl: '', users: [] },
  loading: false,
  error: '',
  channels: [],
  directMessages: [],
  githubRepositories: [],
  users: [],
  showRightSideMenu: RightMenuTypes.None,
  activeThread: null,
  userProfile: { id: '', email: '', fullName: '', displayName: '', audio: '' },
  threadLoading: false,
  someField: 'string',
  unreadChats: [],
  unreadPostComments: [],
  activeInput: null
};

const markAsUnreadPosts = (unreadChats: IUnreadChat[], chatId: string, unreadPost: IPost) => {
  let currentChatExist = false;
  if (unreadChats.length) {
    unreadChats.forEach(unreadChat => {
      if (unreadChat.id === chatId) {
        currentChatExist = true;
        unreadChat.unreadPosts.push(unreadPost);
      }
    });
  }
  if (!currentChatExist) {
    unreadChats.push({ id: chatId, unreadPosts: [unreadPost] });
  }
  unreadChats.forEach(unreadChat => {
    unreadChat.unreadPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });
  return unreadChats;
};

const markAsUnreadComments = (
  unreadPostComments: IUnreadPostComments[],
  postId: string,
  unreadComment: IServerComment
) => {
  let currentPostExist = false;
  if (unreadPostComments.length) {
    unreadPostComments.forEach(unreadPostComment => {
      if (unreadPostComment.id === postId) {
        currentPostExist = true;
        unreadPostComment.unreadComments.push(unreadComment);
      }
    });
  }
  if (!currentPostExist) {
    unreadPostComments.push({ id: postId, unreadComments: [unreadComment] });
  }
  unreadPostComments.forEach(unreadPostComment => {
    unreadPostComment.unreadComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });
  return unreadPostComments;
};

const workspace = (state: IWorkspaceState = initialState, { type, payload }: Routine<any>): IWorkspaceState => {
  switch (type) {
    case selectWorkspaceRoutine.TRIGGER:
      return {
        ...state,
        workspace: payload,
        showRightSideMenu: RightMenuTypes.None
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
        githubRepositories: payload.githubRepositories || [],
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
    case updateActiveInputRoutine.TRIGGER:
      const { activeInput } = payload;
      return { ...state, activeInput };

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
      if (newChat.type === ChatType.GithubRepository) {
        const githubRepositories = [...state.githubRepositories];
        githubRepositories.push(newChat);
        return { ...state, githubRepositories };
      }
      return state;
    }
    case deleteFromChatWithSocketRoutine.TRIGGER:
      return {
        ...state,
        channels: state.channels.filter(channel => channel.id !== payload)
      };
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
      const workspaceChatsCopy = [...state[chatTypeKey]];
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
    case markAsUnreadPostWithSocketRoutine.TRIGGER: {
      const unreadChatsforState = markAsUnreadPosts(state.unreadChats, payload.chatId, payload.unreadPost);
      return {
        ...state, unreadChats: [...unreadChatsforState]
      };
    }
    case markAsUnreadCommentWithSocketRoutine.TRIGGER: {
      const unreadPostsforState = markAsUnreadComments(state.unreadPostComments, payload.postId, payload.comment);
      return {
        ...state, unreadPostComments: [...unreadPostsforState]
      };
    }
    case markAsUnreadPostWithOptionRoutine.TRIGGER: {
      return {
        ...state
      };
    }
    case markAsUnreadPostWithOptionRoutine.SUCCESS: {
      const unreadChatsforState = markAsUnreadPosts(state.unreadChats, payload.chatId, payload);
      return {
        ...state, unreadChats: [...unreadChatsforState]
      };
    }
    case markAsUnreadCommentWithOptionRoutine.TRIGGER: {
      return {
        ...state
      };
    }
    case markAsUnreadCommentWithOptionRoutine.SUCCESS: {
      const unreadPostCommentsforState = markAsUnreadComments(
        state.unreadPostComments, payload.postId, payload.unreadComment
      );
      return {
        ...state, unreadPostComments: [...unreadPostCommentsforState]
      };
    }
    case fetchUnreadUserPostsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUnreadUserPostsRoutine.SUCCESS: {
      let unreadPosts: IPost[] = [];
      if (payload.unreadPosts) {
        unreadPosts = [...payload.unreadPosts];
      }
      const unreadChats: IUnreadChat[] = [];
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
          if (!chatExists && unreadPost.chatId) {
            unreadChats.push({ id: unreadPost.chatId, unreadPosts: [unreadPost] });
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

    case fetchUnreadUserCommentsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchUnreadUserCommentsRoutine.SUCCESS: {
      let unreadComments: IServerComment[] = [];
      if (payload.unreadComments) {
        unreadComments = [...payload.unreadComments];
      }
      const unreadPostComments: IUnreadPostComments[] = [];
      if (unreadComments.length) {
        unreadComments.forEach(unreadComment => {
          let postExists = false;
          if (unreadPostComments.length) {
            unreadPostComments.forEach(unreadPost => {
              if (unreadComment.postId === unreadPost.id) {
                unreadPost.unreadComments.push(unreadComment);
                postExists = true;
              }
            });
          }
          if (!postExists) {
            unreadPostComments.push({ id: unreadComment.postId, unreadComments: [unreadComment] });
          }
        });
      }
      unreadPostComments.forEach(unreadPost => {
        unreadPost.unreadComments.sort((a, b) => (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      });
      return {
        ...state, loading: false, unreadPostComments
      };
    }
    case fetchUnreadUserCommentsRoutine.FAILURE:
      return {
        ...state, loading: false
      };

    case readPostRoutine.TRIGGER:
      return {
        ...state
      };
    case readPostRoutine.SUCCESS:
      return {
        ...state, unreadChats: payload
      };
    case readPostRoutine.FAILURE:
      return {
        ...state
      };
    case readCommentRoutine.TRIGGER:
      return {
        ...state
      };
    case readCommentRoutine.SUCCESS:
      return {
        ...state, unreadPostComments: payload
      };
    case readCommentRoutine.FAILURE:
      return {
        ...state
      };
    case removeUserFromChatInWorkspaceRoutine.SUCCESS: {
      const { chatId, userId } = payload;
      const chat = [...state.channels, ...state.directMessages].filter(({ id: _chatId }) => _chatId === chatId)[0];
      chat.users = [...chat.users.filter(user => user.id !== userId)];

      if (chat.type === ChatType.Channel) {
        return {
          ...state,
          channels: [...state.channels.filter(({ id: _chatId }) => _chatId !== chatId), chat]
        };
      }

      if (chat.type === ChatType.DirectMessage) {
        return {
          ...state,
          directMessages: [...state.directMessages.filter(({ id: _chatId }) => _chatId !== chatId), chat]
        };
      }

      return { ...state };
    }
    case removeUserFromChatInWorkspaceRoutine.FAILURE:
      return {
        ...state,
        loading: false
      };
    case setChatMuteSocketRoutine.TRIGGER: {
      const { chatId, isMuted } = payload;
      const { channels, directMessages } = state;
      const chats = [...channels, ...directMessages];
      const targetChat = chats.find(chat => chat.id === chatId);

      if (targetChat) {
        targetChat.isMuted = isMuted;
      }
      return {
        ...state,
        channels: chats.filter(c => c.type === ChatType.Channel),
        directMessages: chats.filter(c => c.type === ChatType.DirectMessage)
      };
    }
    case editCommentWithSocketRoutine.TRIGGER:
      const editedComment = payload;
      const { activeThread } = state;
      const comments = [...(activeThread ? activeThread.comments : [])]
        .map(comment => (comment.id === editedComment.id ? editedComment : comment));
      if (activeThread) {
        activeThread.comments = comments;
      }
      return {
        ...state, activeThread
      };
    case deleteCommentWithSocketRoutine.TRIGGER:
      const activeThreadDel = state.activeThread;
      const newComments = [...(activeThreadDel ? activeThreadDel.comments : [])]
        .filter(comment => (comment.id !== payload));
      if (activeThreadDel) {
        activeThreadDel.comments = newComments;
      }
      return {
        ...state, activeThread: activeThreadDel
      };
    case editPostWithSocketRoutine.TRIGGER:
      const editedPost = payload;
      const activeThreadEdit = state.activeThread;
      const post = activeThreadEdit ? activeThreadEdit.post : null;
      if (editedPost.id !== post?.id) {
        return {
          ...state
        };
      }
      if (activeThreadEdit) {
        activeThreadEdit.post = editedPost;
      }
      return {
        ...state, activeThread: activeThreadEdit
      };
    case deletePostWithSocketRoutine.TRIGGER:
      const activeThreadDelPost = state.activeThread?.post.id === payload ? null : state.activeThread;

      return {
        ...state, activeThread: activeThreadDelPost
      };
    default:
      return state;
  }
};

export default workspace;
