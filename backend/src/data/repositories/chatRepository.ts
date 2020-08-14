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

  getByIdWithUsers(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['posts', 'users'] });
  }

  getAllByUser(userId: string): Promise<Chat[]> {
    return this.find({
      relations: ['users'],
      where: { createdByUser: userId }
    });
  }
}

export default ChatRepository;
