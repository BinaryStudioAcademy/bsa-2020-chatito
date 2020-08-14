import io from 'socket.io-client';
import { env } from '../env';
import { getAccessToken } from 'common/helpers/storageHelper';
import { store } from 'store';
import { IPost } from 'common/models/post/IPost';
import { addPostWithSocketRoutine, editPostWithSocketRoutine, addChatWithSocketRoutine } from 'scenes/Chat/routines';
import { incUnreadCountRoutine } from 'scenes/Workspace/routines';
import { IChat } from 'common/models/chat/IChat';

const { server } = env.urls;

// eslint-disable-next-line
const chatSocket = io(`${server!}/chat`, { query: `auth_token=${getAccessToken()}` });

export const connectSockets = () => {
  chatSocket.on('addPost', (post: IPost) => {
    const state = store.getState();
    if (post.chatId === state.chat.chat.id) {
      store.dispatch(addPostWithSocketRoutine(post));
    } else {
      store.dispatch(incUnreadCountRoutine({ chatId: post.chatId }));
    }
  });

  chatSocket.on('editPost', (post: IPost) => {
    const state = store.getState();
    if (post.chatId === state.chat.chat.id) {
      store.dispatch(editPostWithSocketRoutine(post));
    }
  });
  chatSocket.on('joinChat', (chatId: string) => {
    chatSocket.emit('joinChatRoom', chatId);
  });
  chatSocket.on('addChat', (chat: IChat) => {
    store.dispatch(addChatWithSocketRoutine(chat));
  });
};
