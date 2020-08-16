import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';
import { ICreateChat } from '../../common/models/chat/ICreateChat';

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  addChat(chat: ICreateChat): Promise<Chat> {
    const newChat = this.create(chat);
    return newChat.save();
  }

  getById(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['posts'] });
  }

  getAllByUser(userId: string): Promise<Chat[]> {
    return this.find({
      relations: ['users'],
      where: { createdByUser: userId }
    });
  }

  async findByName(name: string) {
    const chat = await this.findOne({ name });
    return chat;
  }
}

export default ChatRepository;
