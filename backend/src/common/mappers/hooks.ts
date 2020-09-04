import { getGithubRepositoryChat } from '../../services/chatService';
import { ICreatePost } from '../models/post/ICreatePost';

export const fromGithubPayloadToPost = async (githubPayload: any): Promise<ICreatePost> => {
  const { action, repository, pull_request: pullRequest } = githubPayload;

  const repositoryName = repository.name;
  const repositoryOwner = repository.owner.login;

  const chat = await getGithubRepositoryChat(repositoryName, repositoryOwner);

  if (pullRequest && action === 'opened') {
    const messageText = `
      <p>New PR
      <b>
        <a href=${pullRequest.html_url} rel="noopener noreferrer" target="_blank">
          ${pullRequest.title}
        </a>
      </b> has been created
        by <b>
      <a href=${pullRequest.user.html_url} rel="noopener noreferrer" target="_blank">
        ${pullRequest.user.login}
      </a></b>.<p>`;

    return { chatId: chat.id, text: messageText };
  }

  return null;
};
