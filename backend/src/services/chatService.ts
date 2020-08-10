import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import { IPost } from '../common/models/post/IPost';

export const getAllChatPosts = async (chatId: string) => {
  const chatPosts: IPost[] = await getCustomRepository(PostRepository).getAllChatPosts(chatId);
  return chatPosts;
};
