import { Chat } from '../../data/entities/Chat';
import { fromUserToUserClient } from './user';

export const fromChatToClientChat = (chat: Chat, isMuted: boolean) => {
  const { id, name, type, isPrivate, workspaceId, createdByUserId, hash, users, draftPosts } = chat;
  const clientUsers = users.map(user => fromUserToUserClient(user));
  return {
    id,
    name,
    type,
    isPrivate,
    workspaceId,
    createdByUserId,
    hash,
    users: clientUsers,
    draftPosts,
    isMuted
  };
};
