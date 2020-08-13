import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';
import { ICreateChat } from '../../common/models/chat/ICreateChat';

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  addChat(chat: ICreateChat): Promise<Chat> {
    const newChat = this.create(chat);
    return newChat.save();
  }
}

export default ChatRepository;
