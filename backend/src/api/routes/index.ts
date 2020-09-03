import { Express } from 'express';
import userRoute from './userRoutes';
import authRoutes from './authRoutes';
import workspaceRoutes from './workspaceRoutes';
import postRoutes from './postRoutes';
import chatRoutes from './chatRoutes';
import postReactionsRoutes from './postReactionRoutes';
import draftRoutes from './draftRoutes';
import awsRoutes from './awsRoutes';
import hooksRoutes from './hooksRoutes';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoutes);
  app.use('/api/workspaces', workspaceRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/post-reactions', postReactionsRoutes);
  app.use('/api/aws', awsRoutes);
  app.use('/api/drafts', draftRoutes);
  app.use('/api/hooks', hooksRoutes);
};

export default routes;
