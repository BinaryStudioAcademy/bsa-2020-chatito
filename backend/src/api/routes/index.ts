import { Express } from 'express';
import userRoute from './userRoute';
import authRoutes from './authRoutes';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoutes);
};

export default routes;
