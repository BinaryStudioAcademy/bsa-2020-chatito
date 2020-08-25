import { toastrSuccess } from 'services/toastrService';
import io from 'socket.io-client';
import { env } from '../env';
import { getAccessToken } from 'common/helpers/storageHelper';
import { store } from 'store';
import { IPost } from 'common/models/post/IPost';
import { addPostWithSocketRoutine,
  editPostWithSocketRoutine,
  addChatWithSocketRoutine } from 'scenes/Chat/routines';
import { incUnreadCountRoutine,
  addActiveCommentWithSocketRoutine,
  newUserNotificationWithSocketRoutine } from 'scenes/Workspace/routines';
import { IChat } from 'common/models/chat/IChat';
import { ClientSockets } from 'common/enums/ClientSockets';
import { ServerSockets } from 'common/enums/ServerSockets';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { addCommentWithSocketRoutine } from 'containers/ThreadsContainer/routines';
import { IServerComment } from 'common/models/post/IServerComment';
import { IUser } from 'common/models/user/IUser';
import { ChatType } from 'common/enums/ChatType';

const { server } = env.urls;

export const connectSockets = () => {
  // eslint-disable-next-line
  const chatSocket = io(`${server}/chat`, { query: `auth_token=${getAccessToken()}` });

  chatSocket.on(ClientSockets.AddPost, (post: IPost) => {
    const state = store.getState();
    if (post.chatId === state.chat.chat.id) {
      store.dispatch(addPostWithSocketRoutine(post));
    } else {
      store.dispatch(incUnreadCountRoutine({ chatId: post.chatId }));
    }
  });

  chatSocket.on(ClientSockets.EditPost, (post: IPost) => {
    const state = store.getState();
    if (post.chatId === state.chat.chat.id) {
      store.dispatch(editPostWithSocketRoutine(post));
    }
  });
  chatSocket.on(ClientSockets.JoinChat, (chatId: string) => {
    chatSocket.emit(ServerSockets.JoinChatRoom, chatId);
  });
  chatSocket.on(ClientSockets.AddChat, (chat: IChat) => {
    store.dispatch(addChatWithSocketRoutine(chat));
    store.dispatch(push(Routes.Chat.replace(':whash', chat.workspace.hash).replace(':chash', chat.hash)));
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
  chatSocket.on(ClientSockets.NewUserNotification, (
    users: IUser[],
    chatName: string,
    chatType: ChatType
  ) => {
    store.dispatch(newUserNotificationWithSocketRoutine({ users, chatType }));
    if (users.length === 1) {
      toastrSuccess(`User ${users[0].displayName} was invited to chat ${chatName}`);
    } else {
      let usersString = '';
      users.forEach((user, index) => {
        usersString += `${user.displayName}${index === users.length - 1 ? '' : ', '}`;
      });
      toastrSuccess(`Users ${usersString} were invited to chat ${chatName}`);
    }
  });
};
