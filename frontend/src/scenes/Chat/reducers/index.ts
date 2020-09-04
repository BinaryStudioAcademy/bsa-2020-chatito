import { Routine } from 'redux-saga-routines';
import {
  addPostReactionRoutine,
  deletePostReactionRoutine,
  addPostReactionWithSocketRoutine,
  deletePostReactionWithSocketRoutine
} from 'containers/Post/routines';
import {
  setCurrentChatRoutine,
  setPostsRoutine,
  createChatRoutine,
  addPostWithSocketRoutine,
  editPostWithSocketRoutine,
  fetchChatUsersRoutine,
  removeUserFromChatRoutine,
  addReminderRoutine,
  addReminderSuccessPostRoutine,
  createChatAndAddPostRoutine,
  updatePostDraftCommentRoutine,
  upsertDraftPostWithSocketRoutine,
  deleteDraftPostWithSocketRoutine,
  fetchNavigationPostRoutine,
  addPostRoutine
} from '../routines';
import { IChat } from 'common/models/chat/IChat';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';
import { ICreateReminder } from 'common/models/reminder/ICreateReminder';
import { IncomingSoundOptions } from 'common/enums/IncomingSoundOptions';

export interface IChatState {
  chat?: IChat;
  posts: IPost[];
  users?: IUser[];
  reminders?: ICreateReminder[];
  loading: boolean;
  error: any;
  hasMorePosts: boolean;
  fetchFrom: number;
  fetchCount: number;
}

const initialState: IChatState = {
  posts: [],
  reminders: [],
  loading: false,
  error: '',
  hasMorePosts: true,
  fetchFrom: 0,
  fetchCount: 10
};

const reducer = (state: IChatState = initialState, { type, payload }: Routine<any>): IChatState => {
  switch (type) {
    case setCurrentChatRoutine.TRIGGER:
      return {
        ...state,
        chat: undefined,
        posts: [],
        fetchFrom: 0,
        fetchCount: 10
      };
    case setCurrentChatRoutine.SUCCESS:
      const chat = payload ? { ...payload } : null;
      return {
        ...state,
        chat,
        loading: true
      };
    case setPostsRoutine.TRIGGER:
      return {
        ...state,
        hasMorePosts: false
      };
    case setPostsRoutine.SUCCESS:
      return {
        ...state,
        posts: [...payload, ...(state.posts || [])],
        loading: false,
        hasMorePosts: Boolean(payload.length),
        fetchFrom: state.fetchFrom + state.fetchCount
      };
    case upsertDraftPostWithSocketRoutine.TRIGGER:
      if (state.chat) {
        return {
          ...state,
          chat: {
            ...state.chat,
            draftPosts: [
              payload
            ]
          }
        };
      }
      return state;

    case deleteDraftPostWithSocketRoutine.TRIGGER:
      if (state.chat) {
        return {
          ...state,
          chat: {
            ...state.chat,
            draftPosts: []
          }
        };
      }
      return state;
    case updatePostDraftCommentRoutine.TRIGGER: {
      const { postId, id, text } = payload;
      const draftComments = id ? [{ id, text }] : [];

      const updatedPosts = state.posts.map(post => (
        post.id === postId
          ? { ...post, draftComments }
          : post
      ));

      return {
        ...state,
        posts: updatedPosts
      };
    }
    case createChatRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case createChatRoutine.SUCCESS:
      return {
        ...state, chat: payload, loading: false
      };
    case createChatRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addPostReactionRoutine.SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (payload.id === post.id) {
            return payload;
          }
          return post;
        })
      };
    case deletePostReactionRoutine.SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (payload.id === post.id) {
            return payload;
          }
          return post;
        })
      };
    case addPostReactionWithSocketRoutine.TRIGGER: {
      const { postId, userId, reaction } = payload;
      return {
        ...state,
        posts: state.posts.map(post => {
          if (postId === post.id) {
            return {
              ...post,
              postReactions: [...post.postReactions, { userId, reaction }]
            };
          }
          return post;
        })
      };
    }
    case deletePostReactionWithSocketRoutine.TRIGGER: {
      const { postId, userId, reaction } = payload;
      return {
        ...state,
        posts: state.posts.map(post => {
          if (postId === post.id) {
            return {
              ...post,
              postReactions: post.postReactions.filter(r => r.userId !== userId || r.reaction !== reaction)
            };
          }
          return post;
        })
      };
    }
    case addPostWithSocketRoutine.TRIGGER: {
      const posts = [...state.posts];
      posts.push(payload);
      return {
        ...state, posts
      };
    }
    case editPostWithSocketRoutine.TRIGGER: {
      const editedPost = payload;
      const posts = [...state.posts].map(post => (post.id === editedPost.id ? editedPost : post));
      return {
        ...state, posts
      };
    }
    case fetchChatUsersRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchChatUsersRoutine.SUCCESS:
      if (state.chat) {
        const newChat = { ...state.chat, users: payload };
        return {
          ...state, chat: newChat, loading: false
        };
      }
      return state;
    case fetchChatUsersRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case removeUserFromChatRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case removeUserFromChatRoutine.SUCCESS:
      if (state.chat) {
        const newUserList = state.chat?.users?.filter(user => user.id !== payload) || [];
        const chatState = { ...state.chat, users: newUserList };
        return {
          ...state, chat: chatState, loading: false
        };
      }
      return state;
    case removeUserFromChatRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addReminderRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case addReminderRoutine.SUCCESS:
      return {
        ...state, reminders: { ...state.reminders, ...payload }, loading: false
      };
    case addReminderRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchNavigationPostRoutine.TRIGGER:
      return {
        ...state,
        hasMorePosts: false
      };
    case fetchNavigationPostRoutine.SUCCESS:
      return {
        ...state,
        posts: [...payload, ...(state.posts || [])],
        loading: false,
        hasMorePosts: Boolean(payload.length),
        fetchFrom: payload.length
      };
    case addReminderSuccessPostRoutine.SUCCESS:
      const { day, time, note, chatId } = payload;
      const chatitoBotMock = {
        id: '0',
        fullName: 'Chatito Bot',
        displayName: 'Chatito Bot',
        email: 'chatito@gmail.com',
        audio: 'https://mobcup.net/d/c76xxfvk/mp3',
        incomingSoundOptions: IncomingSoundOptions.MuteAll
      };
      const newPost: IPost = {
        createdByUser: chatitoBotMock,
        text: `I'll remind you about this message ${note ? `with note "${note}"` : ''} at ${day} ${time}.`,
        createdAt: new Date(),
        id: '0',
        postReactions: [],
        commentsInfo: { count: 0, lastAt: new Date(), avatars: [] },
        chatId
      };
      const posts = [...state.posts];
      posts.push(newPost);
      return {
        ...state, posts
      };
    case createChatAndAddPostRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case createChatAndAddPostRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case addPostRoutine.SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts,
          payload
        ],
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
