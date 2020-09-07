import { Chat } from '../../data/entities/Chat';
import { fromUserToUserClient } from './user';

export const fromChatToClientChat = (chat: Chat, isMuted = false) => {
  const { id, name, type, description, isPrivate, workspaceId, createdByUserId, hash, users, draftPosts } = chat;
  const clientUsers = users.map(user => fromUserToUserClient(user));
  return {
    id,
    name,
    type,
    description,
    isPrivate,
    workspaceId,
    createdByUserId,
    hash,
    users: clientUsers,
    draftPosts,
    isMuted
  };
};
