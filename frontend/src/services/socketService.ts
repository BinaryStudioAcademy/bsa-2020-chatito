import { toastrSuccess } from 'services/toastrService';
import io from 'socket.io-client';
import { env } from '../env';
import { getAccessToken } from 'common/helpers/storageHelper';
import { store } from 'store';
import { IPost } from 'common/models/post/IPost';
import {
  addPostWithSocketRoutine,
  editPostWithSocketRoutine,
  addChatWithSocketRoutine,
  upsertDraftPostWithSocketRoutine,
  usertDraftsPagePostRoutine,
  deleteDraftPostWithSocketRoutine,
  updatePostDraftCommentRoutine,
  deleteDraftPostFromDraftsRoutine,
  setChatMuteSocketRoutine
} from 'scenes/Chat/routines';
import {
  incUnreadCountRoutine,
  addActiveCommentWithSocketRoutine,
  newUserNotificationWithSocketRoutine,
  updateChatDraftPostRoutine,
  markAsUnreadPostWithSocketRoutine,
  markAsUnreadCommentWithSocketRoutine
} from 'scenes/Workspace/routines';
import { IChat } from 'common/models/chat/IChat';
import { ClientSockets } from 'common/enums/ClientSockets';
import { ServerSockets } from 'common/enums/ServerSockets';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { addCommentWithSocketRoutine } from 'containers/ThreadsContainer/routines';
import { IServerComment } from 'common/models/post/IServerComment';
import { IPostReactionSocket } from 'common/models/postReaction/IPostReactionSocket';
import { addPostReactionWithSocketRoutine, deletePostReactionWithSocketRoutine } from 'containers/Post/routines';
import { IUser } from 'common/models/user/IUser';
import { ChatType } from 'common/enums/ChatType';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IDraftComment } from 'common/models/draft/IDraftComment';
import {
  upsertDraftCommentWithSocketRoutine,
  deleteDraftCommentWithSocketRoutine,
  upsertDraftPageCommentRoutine,
  deleteDraftCommentFromDraftsRoutine
} from 'containers/Thread/routines';
import { playByUrl } from 'common/helpers/audioHelper';
import { defaultNotificationAudio } from 'common/configs/defaults';
import { IncomingSoundOptions } from 'common/enums/IncomingSoundOptions';

const { server } = env.urls;

export const connectSockets = () => {
  const chatSocket = io(`${server}/chat`, { query: `auth_token=${getAccessToken()}` });

  chatSocket.on(ClientSockets.AddPost, (post: IPost, audio: string) => {
    const addedPost = { ...post };
    const state = store.getState();
    if (addedPost.chatId === state.chat.chat?.id) {
      store.dispatch(addPostWithSocketRoutine(addedPost));
      return;
    }
    store.dispatch(incUnreadCountRoutine({ chatId: post.chatId }));

    // Check if chat is muted
    const { channels, directMessages } = state.workspace;
    const targetChat = [...channels, ...directMessages].find(c => c.id === addedPost.chatId);
    if (targetChat && targetChat.isMuted) {
      return;
    }

    switch (state.user.user?.incomingSoundOptions) {
      case IncomingSoundOptions.AllowCustom:
        playByUrl(audio || defaultNotificationAudio);
        break;
      case IncomingSoundOptions.UseDefault:
        playByUrl(defaultNotificationAudio);
        break;
      case IncomingSoundOptions.MuteAll:
      default:
        break;
    }
  });

  chatSocket.on(ClientSockets.NotifyAndMarkAsUnread, (post: IPost, user: IUser, chat: IChat) => {
    const state = store.getState();
    const currentUser = state.user.user;
    if (currentUser && user.id !== currentUser.id) {
      store.dispatch(markAsUnreadPostWithSocketRoutine({ chatId: chat.id, chatType: chat.type, unreadPost: post }));
    }
  });

  chatSocket.on(ClientSockets.EditPost, (post: IPost) => {
    const state = store.getState();
    if (post.chatId === state.chat.chat?.id) {
      store.dispatch(editPostWithSocketRoutine(post));
    }
  });

  chatSocket.on(ClientSockets.JoinChat, (chatId: string) => {
    chatSocket.emit(ServerSockets.JoinChatRoom, chatId);
  });

  chatSocket.on(ClientSockets.AddChat, (chat: IChat) => {
    store.dispatch(addChatWithSocketRoutine(chat));
    store.dispatch(push(Routes.Chat.replace(':whash', chat.workspace.hash).replace(':chash', chat.hash)));
    // play sound ?
  });

  chatSocket.on(ClientSockets.AddReply, (comment: IServerComment) => {
    const state = store.getState();
    if (state.threads.threads) {
      store.dispatch(addCommentWithSocketRoutine(comment));
    }
    const { activeThread } = state.workspace;
    if (activeThread && activeThread.post.id === comment.postId) {
      store.dispatch(addActiveCommentWithSocketRoutine(comment));
    }
  });

  chatSocket.on(ClientSockets.MarkAsUnreadComment, (
    postId: string,
    comment: IServerComment,
    threadParticipants: string[]
  ) => {
    const state = store.getState();
    const currentUser = state.user.user;
    if (currentUser && threadParticipants.includes(currentUser.id) && comment.createdByUser.id !== currentUser.id) {
      store.dispatch(markAsUnreadCommentWithSocketRoutine({ postId, comment }));
    }
  });

  chatSocket.on(ClientSockets.AddReaction, (reaction: IPostReactionSocket) => {
    const state = store.getState();
    if (reaction.userId !== state.user.user?.id as string) {
      store.dispatch(addPostReactionWithSocketRoutine(reaction));
    }
  });

  chatSocket.on(ClientSockets.DeleteReaction, (reaction: IPostReactionSocket) => {
    const state = store.getState();
    if (reaction.userId !== state.user.user?.id as string) {
      store.dispatch(deletePostReactionWithSocketRoutine(reaction));
    }
  });

  chatSocket.on(ClientSockets.NewUserNotification, (
    users: IUser[],
    chatName: string,
    chatType: ChatType,
    chatId: string
  ) => {
    store.dispatch(newUserNotificationWithSocketRoutine({ users, chatType, chatId }));
    const state = store.getState();
    const currentUserId = state.user.user?.id;
    if (users.length === 1) {
      if (currentUserId === users[0].id) return;
      toastrSuccess(`User ${users[0].displayName} joined to channel "${chatName}"`);
    } else {
      let usersString = '';
      users.forEach((user, index) => {
        usersString += `${user.displayName}${index === users.length - 1 ? '' : ', '}`;
      });
      toastrSuccess(`Users ${usersString} joined to channel "${chatName}"`);
    }
  });

  chatSocket.on(ClientSockets.UpsertDraftPost, (userId: string, chatId: string, draftPost: IDraftPost) => {
    const state = store.getState();
    // store.dispatch(updateDraftsListRoutine({ ...draftPost, chatId }));

    if (state.user.user?.id === userId) {
      store.dispatch(usertDraftsPagePostRoutine(draftPost));
      store.dispatch(updateChatDraftPostRoutine({ ...draftPost, chatId }));
      if (chatId === state.chat.chat?.id) {
        store.dispatch(upsertDraftPostWithSocketRoutine(draftPost));
      }
    }
  });

  chatSocket.on(ClientSockets.DeleteDraftPost, (userId: string, chatId: string, post: IPost) => {
    const state = store.getState();

    if (state.user.user?.id === userId) {
      store.dispatch(deleteDraftPostFromDraftsRoutine(post));
      store.dispatch(updateChatDraftPostRoutine({ chatId }));
      if (chatId === state.chat.chat?.id) {
        store.dispatch(deleteDraftPostWithSocketRoutine());
      }
    }
  });

  chatSocket.on(ClientSockets.UpsertDraftComment, (
    userId: string,
    chatId: string,
    postId: string,
    draftComment: IDraftComment
  ) => {
    const state = store.getState();

    if (postId === state.workspace.activeThread?.post.id && state.user.user?.id === userId) {
      store.dispatch(upsertDraftCommentWithSocketRoutine(draftComment));
    }

    if (state.user.user?.id === userId) {
      store.dispatch(upsertDraftPageCommentRoutine({ ...draftComment, postId }));
      if (chatId === state.chat.chat?.id) {
        store.dispatch(updatePostDraftCommentRoutine({ ...draftComment, postId }));
      }
    }
  });

  chatSocket.on(ClientSockets.DeleteDraftComment, (userId: string, chatId: string, postId: string) => {
    const state = store.getState();
    if (postId === state.workspace.activeThread?.post.id && state.user.user?.id === userId) {
      store.dispatch(deleteDraftCommentWithSocketRoutine());
    }

    if (state.user.user?.id === userId) {
      store.dispatch(deleteDraftCommentFromDraftsRoutine(postId));
      if (chatId === state.chat.chat?.id) {
        store.dispatch(updatePostDraftCommentRoutine({ postId }));
      }
    }
  });

  chatSocket.on(ClientSockets.SetChatMuted, (chatId: string, userId: string, isMuted: boolean) => {
    const state = store.getState();
    if (state.user.user?.id === userId) {
      store.dispatch(setChatMuteSocketRoutine({ chatId, isMuted }));
    }
  });
};
