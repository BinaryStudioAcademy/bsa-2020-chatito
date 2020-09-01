import { getGithubRepositoryChat } from '../../services/chatService';
import { ICreatePost } from '../models/post/ICreatePost';

export const fromGithubPayloadToPost = async (githubPayload: any): Promise<ICreatePost> => {
  console.log(githubPayload);
  const { repository } = githubPayload;
  const repositoryName = repository.name;
  const repositoryOwner = repository.owner.name;

  const chat = await getGithubRepositoryChat(repositoryName, repositoryOwner);
  // choose chat id to post a notification
  // create text depending on the action
  return { chatId: chat.id, text: 'github event' };
};
