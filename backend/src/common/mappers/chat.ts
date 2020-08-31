import { Chat } from '../../data/entities/Chat';
import { getImageUrl } from '../utils/imageHelper';

export const fromChatToClientChat = (chat: Chat) => {
  const { id, name, type, isPrivate, workspaceId, createdByUserId, hash, users, draftPosts } = chat;
  const clientUsers = users.map(user => ({ ...user, imageUrl: getImageUrl(user.imageUrl) }));
  return {
    id,
    name,
    type,
    isPrivate,
    workspaceId,
    createdByUserId,
    hash,
    users: clientUsers,
    draftPosts
  };
};
