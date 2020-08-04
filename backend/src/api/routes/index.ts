import { Express } from 'express';
import userRoute from './userRoute';
import workspaceRoute from './workspaceRoute';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api', workspaceRoute);
};

export default routes;
