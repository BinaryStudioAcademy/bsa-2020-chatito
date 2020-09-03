import { getGithubRepositoryChat } from '../../services/chatService';
import { ICreatePost } from '../models/post/ICreatePost';

export const fromGithubPayloadToPost = async (githubPayload: any): Promise<ICreatePost> => {
  const { action, repository, pull_request: pullRequest } = githubPayload;

  const repositoryName = repository.name;
  const repositoryOwner = repository.owner.login;

  const chat = await getGithubRepositoryChat(repositoryName, repositoryOwner);

  let messageText;
  if (pullRequest && action === 'opened') {
    messageText = `New PR by ${pullRequest.user.login} has been created.
      Follow the link to see ${pullRequest.url}`;
  } else {
    messageText = `Github event in ${repositoryName}.`;
  }

  return { chatId: chat.id, text: messageText };
};
