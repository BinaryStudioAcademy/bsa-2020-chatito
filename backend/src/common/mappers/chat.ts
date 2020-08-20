import { Chat } from '../../data/entities/Chat';

export const fromChatToClientChat = (chat: Chat) => {
  const { id, name, type, isPrivate, workspaceId, createdByUserId, hash, users } = chat;
  return { id, name, type, isPrivate, workspaceId, createdByUserId, hash, users };
};
