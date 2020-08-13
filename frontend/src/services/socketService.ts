import io from 'socket.io-client';
import { env } from '../env';
import { getAccessToken } from 'common/helpers/storageHelper';
import { SocketRoutes } from 'common/enums/SocketRoutes';
import { store } from 'store';
import { IPost } from 'common/models/post/IPost';
import { addPostWithSocketRoutine, editPostWithSocketRoutine } from 'scenes/Chat/routines';
import { incUnreadCountRoutine } from 'scenes/Workspace/routines';

const { server } = env.urls;

// eslint-disable-next-line
const socket = io(server!, { query: `auth_token=${getAccessToken()}` });

export const connectSockets = () => {
  socket.on(SocketRoutes.AddPost, (post: IPost) => {
    const state = store.getState();
    post.chatId === state.chat.chat.id
      ? addPostWithSocketRoutine(post)
      : incUnreadCountRoutine({ chatId: post.chatId });
  });

  socket.on(SocketRoutes.EditPost, (post: IPost) => {
    const state = store.getState();
    post.chatId === state.chat.chat.id
      ? editPostWithSocketRoutine(post)
      : null;
  });
};
