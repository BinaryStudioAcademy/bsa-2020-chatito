import api from 'common/helpers/apiHelper';
import { IChatData } from 'common/models/chat/IChatData';

export const addChat = async (chatData: IChatData) => {
  const response = await api.post('/api/chats', { chat: chatData });
  return response;
};

export const getChats = async () => {
  const response = await api.get('/api/chats');
  return response;
};
