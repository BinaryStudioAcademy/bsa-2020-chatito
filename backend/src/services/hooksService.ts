import { addPost } from './postService';
import { getGithubUser } from './userService';
import { fromGithubPayloadToPost } from '../common/mappers/hooks';

export const addGithubNotification = async (githubPayload: any) => {
  const post = await fromGithubPayloadToPost(githubPayload);
  const githubUser = await getGithubUser();

  const notificationPost = await addPost(githubUser.id, post);

  return notificationPost;
};
