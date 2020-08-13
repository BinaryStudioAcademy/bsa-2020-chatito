import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import { IPost } from '../common/models/post/IPost';
import { fromPostToPostClient } from '../common/mappers/post';

export const getAllChatPosts = async (chatId: string) => {
  const chatPosts: IPost[] = await getCustomRepository(PostRepository).getAllChatPosts(chatId);
  const mappedChatPosts = chatPosts.map(async post => fromPostToPostClient(post));
  return mappedChatPosts;
};
