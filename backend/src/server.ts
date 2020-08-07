import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { env } from './env';
import routes from './api/routes';
import authorizationMiddleware from './api/middlewares/authorizationMiddleware';
import routesWhiteList from './config/routesWhiteListConfig';
import './config/passportConfig';
import './config/sendgridConfig';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/', authorizationMiddleware(routesWhiteList));

routes(app);

const { port } = env.app;

app.listen(port, async () => {
  try {
    await createConnection();
    console.log(`Server is running at ${port}.`); // eslint-disable-line no-console
  } catch (error) {
    console.log('App started with error:', error); // eslint-disable-line no-console
  }
});

export default app;
