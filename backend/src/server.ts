import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { env } from './env';
import routes from './api/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
