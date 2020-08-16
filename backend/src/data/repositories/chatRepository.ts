import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';
import { ICreateChat } from '../../common/models/chat/ICreateChat';
import { User } from '../entities/User';

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  addChat(chat: ICreateChat): Promise<Chat> {
    const newChat = this.create(chat);
    return newChat.save();
  }

  getById(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['posts'] });
  }

  getByIdWithUsers(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['posts', 'users', 'workspace'] });
  }

  getAllByUser(userId: string): Promise<Chat[]> {
    return this.find({
      relations: ['users'],
      where: { createdByUser: userId }
    });
  }

  async getAllChatUsers(id: string): Promise<User[]> {
    const chat = await this.findOne({
      where: { id },
      relations: ['users']
    });

    return chat.users;
  }
}

export default ChatRepository;
