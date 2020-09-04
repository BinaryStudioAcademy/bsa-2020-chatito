import { addPost } from './postService';
import { getGithubUser, getUserByEmail } from './userService';
import { fromGithubPayloadToPost } from '../common/mappers/hooks';
import { getWorkspaceByName } from './workspaceService';
import { getDirectChatByUsers } from './chatService';

export const addGithubNotification = async (githubPayload: any) => {
  const post = await fromGithubPayloadToPost(githubPayload);
  const githubUser = await getGithubUser();

  const notificationPost = await addPost(githubUser.id, post);

  return notificationPost;
};

export const sendScheduliaMessage = async (payload: any): Promise<null> => {
  // PAYLOAD
  // workspace: workspace name
  // users: [] of user emails
  // message: optional string
  const user1 = await getUserByEmail(payload.users[0]);
  const user2 = await getUserByEmail(payload.users[1]);
  if (!user1 || !user2) {
    console.log('inform schedulia');
  }

  const wp = await getWorkspaceByName(payload.workspace);
  if (!wp) {
    console.log('inform schedulia');
  }

  const chat = await getDirectChatByUsers(user1.id, user2.id, wp.id);
  if (chat) {
    // send message
  } else {
    // create new chat and then send message
  }
  return null;
};
