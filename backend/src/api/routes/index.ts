import { Express } from 'express';
import userRoute from './userRoute';
import authRoutes from './authRoutes';
import workspaceRoutes from './workspaceRoutes';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoutes);
  app.use('/api/workspaces', workspaceRoutes);
};

export default routes;
