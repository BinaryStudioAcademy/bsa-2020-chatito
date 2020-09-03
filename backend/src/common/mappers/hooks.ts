import { getGithubRepositoryChat } from '../../services/chatService';
import { ICreatePost } from '../models/post/ICreatePost';

export const fromGithubPayloadToPost = async (githubPayload: any): Promise<ICreatePost> => {
  const { repository } = githubPayload;
  const repositoryName = repository.name;
  const repositoryOwner = repository.owner.login;

  const chat = await getGithubRepositoryChat(repositoryName, repositoryOwner);
  const messageText = `github event in ${repositoryName} by ${repositoryOwner}`;

  return { chatId: chat.id, text: messageText };
};
