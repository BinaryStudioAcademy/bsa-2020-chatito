import io from 'socket.io-client';
import { env } from '../env';
import { getAccessToken } from 'common/helpers/storageHelper';
import { store } from 'store';
import { IPost } from 'common/models/post/IPost';
import { addPostWithSocketRoutine, editPostWithSocketRoutine, addChatWithSocketRoutine } from 'scenes/Chat/routines';
import { incUnreadCountRoutine } from 'scenes/Workspace/routines';
import { IChat } from 'common/models/chat/IChat';
import { ClientSockets } from 'common/enums/ClientSockets';
import { ServerSockets } from 'common/enums/ServerSockets';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';

const { server } = env.urls;

// eslint-disable-next-line
const chatSocket = io(`${server!}/chat`, { query: `auth_token=${getAccessToken()}` });

export const connectSockets = () => {
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
    store.dispatch(push(Routes.WorkspaceWithChat.replace(':whash', chat.workspace.hash).replace(':chash', chat.hash)));
  });
};
