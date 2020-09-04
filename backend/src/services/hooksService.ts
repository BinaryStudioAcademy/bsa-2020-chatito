import { getCustomRepository } from 'typeorm';
import { addPost, addPostByBotIntoDirect } from './postService';
import { addChat, getDirectChatByUsers } from './chatService';
import { getGithubUser, getUserByEmail } from './userService';
import { fromGithubPayloadToPost } from '../common/mappers/hooks';
import { getWorkspaceByName } from './workspaceService';
import { IntegrationType } from '../common/enums/IntegrationType';
import { ChatType } from '../common/enums/ChatType';
import { ClientSockets } from '../common/enums/ClientSockets';
import ChatRepository from '../data/repositories/chatRepository';
// import UserRepository from '../data/repositories/userRepository';

export const addGithubNotification = async (githubPayload: any) => {
  const post = await fromGithubPayloadToPost(githubPayload);

  if (post) {
    const githubUser = await getGithubUser();
    const notificationPost = await addPost(githubUser.id, post);
    return notificationPost;
  }

  return {};
};

export const sendScheduliaMessage = async (payload: any, io: any): Promise<null> => {
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
    const newChat = await addChat(user1.id, chatBody);
    chat = await getCustomRepository(ChatRepository).getNameAndTypeAndIdById(newChat.id);
    io.of('/chat').emit(ClientSockets.JoinChat, chat.id);
  }
  const newPost = {
    chat,
    chatId: chat.id,
    createdByUserId: user1.id,
    createdByUser: user1,
    integration: IntegrationType.Schedulia,
    text: 'Let me remind you about meeting!\n'
  };
  await addPostByBotIntoDirect(user1.id, newPost);
  // await getCustomRepository(UserRepository).markAsUnreadPost(user1.id, createdPost.id);

  return null;
};
