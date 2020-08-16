import { getCustomRepository } from 'typeorm';
import cryptoRandomString from 'crypto-random-string';
import { asyncForEach } from '../../common/utils/arrayHelper';
import UserRepository from '../repositories/userRepository';
import WorkspaceRepository from '../repositories/workspaceRepository';
import { Chat } from '../entities/Chat';
import { chats } from '../seed-data/chats.seed';

export default class ChatSeeder {
  public static async execute() {
    const users = (await getCustomRepository(UserRepository).getAll()).map(user => (user.id));
    const workspaces = await getCustomRepository(WorkspaceRepository).find();
    await asyncForEach(async chat => {
      const storeChat = chat;
      const userIndex = parseInt(storeChat.createdByUser, 10) - 1;
      storeChat.createdByUser = users[userIndex];
      const workspace = workspaces[storeChat.workspaceId - 1];
      const hash = cryptoRandomString({ length: 7, type: 'url-safe' }).toUpperCase();
      await Object.assign(new Chat(), { ...storeChat, workspace, hash }).save();
    }, chats);
  }
}
