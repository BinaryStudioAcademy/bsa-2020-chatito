import { getCustomRepository } from 'typeorm';
import { addPost, addPostByBotIntoDirect } from './postService';
import { addChat, getDirectChatByUsers } from './chatService';
import { getGithubUser, getUserByEmail } from './userService';
import { fromGithubPayloadToPost } from '../common/mappers/hooks';
import { getWorkspaceByName } from './workspaceService';
import { IntegrationType } from '../common/enums/IntegrationType';
import { ChatType } from '../common/enums/ChatType';
import ChatRepository from '../data/repositories/chatRepository';

export const addGithubNotification = async (githubPayload: any) => {
  const post = await fromGithubPayloadToPost(githubPayload);

  if (post) {
    const githubUser = await getGithubUser();
    const notificationPost = await addPost(githubUser.id, { ...post, integration: IntegrationType.GitHub });
    return notificationPost;
  }

  return {};
};

export const sendScheduliaMessage = async (payload: any, io: any) => {
  // PAYLOAD
  // workspace: workspace name
  // users: [] of user emails
  // data: {message: html string}
  const user1 = await getUserByEmail(payload.users[0]);
  const user2 = await getUserByEmail(payload.users[1]);

  const wp = await getWorkspaceByName(payload.workspace);

  let chat = await getDirectChatByUsers(user1.id, user2.id, wp.id);
  if (!chat) {
    const chatBody = {
      workspaceName: wp.name,
      type: ChatType.DirectMessage,
      isPrivate: true,
      users: [user1, user2],
      name: 'Schedulia meeting',
      createdByUserId: user1.id
    };
    const newChat = await addChat(user1.id, chatBody, io);
    chat = await getCustomRepository(ChatRepository).getNameAndTypeAndIdById(newChat.id);
  }
  const newPost = {
    chat,
    chatId: chat.id,
    createdByUserId: user1.id,
    createdByUser: user1,
    integration: IntegrationType.Schedulia,
    text: `<p>Schedulia meeting!</p>${payload.data.message}`
  };
  await addPostByBotIntoDirect(user1.id, newPost);
};
