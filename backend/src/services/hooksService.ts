import { addPost } from './postService';
import { getGithubUser } from './userService';
import { fromGithubPayloadToPost } from '../common/mappers/hooks';
import { getWorkspaceByName } from './workspaceService';

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

  console.log('schedulia');
  console.log(payload);
  const wp = getWorkspaceByName(payload.workspace);
  // Check if users have common chats
  return null;
};
