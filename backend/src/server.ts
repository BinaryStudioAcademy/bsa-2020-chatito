import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import { createConnection } from 'typeorm';
import socketIO from 'socket.io';
import { env } from './env';
import routes from './api/routes';
import authorizationMiddleware from './api/middlewares/authorizationMiddleware';
import jwtSocketMiddleware from './api/middlewares/socketAuthorizationMiddleware';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import routesWhiteList from './config/routesWhiteListConfig';
import './config/passportConfig';
import './config/nodeMailer';
import socketInjector from './socket/injector';
import { registerSockets } from './socket/connectNamespaces';

const app = express();
const io = socketIO();

io.use(jwtSocketMiddleware);
export const chatNamespace = io.of('/chat');

app.use(socketInjector(io));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check
app.use(passport.initialize());

app.use('/api/', authorizationMiddleware(routesWhiteList));

routes(app);

const { port } = env.app;

app.use(errorHandlerMiddleware);

const server = app.listen(port, async () => {
  try {
    await createConnection();
    console.log(`Server is running at ${port}.`); // eslint-disable-line no-console
  } catch (error) {
    console.log('App started with error:', error); // eslint-disable-line no-console
  }
});

io.listen(server);

registerSockets();

export default app;
