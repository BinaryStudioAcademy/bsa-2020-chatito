import { Express } from 'express';
import userRoute from './userRoute';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
};

export default routes;
