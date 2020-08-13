import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '../../common/utils/arrayHelper';
import UserRepository from '../repositories/userRepository';
import ChatRepository from '../repositories/chatRepository';
import { Post } from '../entities/Post';
import { posts } from '../seed-data/posts.seed';

export default class PostSeeder {
  public static async execute() {
    const users = (await getCustomRepository(UserRepository).getAll()).map(user => (user.id));
    const chats = await getCustomRepository(ChatRepository).find();
    await asyncForEach(async post => {
      const storePost = post;
      const userIndex = parseInt(storePost.createdByUser, 10) - 1;
      storePost.createdByUser = users[userIndex];
      const chat = chats[storePost.chatId - 1];
      await Object.assign(new Post(), { ...storePost, chat }).save();
    }, posts);
  }
}
