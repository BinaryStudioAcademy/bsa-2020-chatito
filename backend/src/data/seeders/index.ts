import { createConnection } from 'typeorm';
import UserSeeder from './userSeeder';
import WorkspaceSeeder from './workspaceSeeder';
import ChatSeeder from './chatSeeder';
import PostSeeder from './postSeeder';
import CommentSeeder from './commentSeeder';

createConnection()
  .then(async () => {
    await UserSeeder.execute();
    await WorkspaceSeeder.execute();
    await ChatSeeder.execute();
    await PostSeeder.execute();
    await CommentSeeder.execute();
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
  });
