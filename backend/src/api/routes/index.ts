import { Express } from 'express';
import userRoute from './userRoute';
import authRoutes from './authRoutes';
import workspaceRoutes from './workspaceRoutes';
import postRoutes from './postRoutes';
import chatRoutes from './chatRoutes';
import postReactionsRoutes from './postReactionRoutes';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoutes);
  app.use('/api/workspaces', workspaceRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/post-reactions', postReactionsRoutes);
};

export default routes;
