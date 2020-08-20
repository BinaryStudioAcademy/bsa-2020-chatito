import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';
import { ICreateChat } from '../../common/models/chat/ICreateChat';
import { User } from '../entities/User';
import { IUser } from '../../common/models/user/IUser';

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

  getAllByWorkspaceIdAndUserId(workspaceId: string, userId: string) {
    return this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('chat.workspace', 'workspace')
      .where('workspace.id = :workspaceId', { workspaceId })
      .getMany();
  }

  getAllByUser(userId: string): Promise<Chat[]> {
    return this.find({
      relations: ['users'],
      where: { createdByUser: userId }
    });
  }

  addUsersToChat(chatId: string, userIds: string[]) {
    return this
      .createQueryBuilder()
      .relation(Chat, 'users')
      .of(chatId)
      .add(userIds);
  }

  async getAllChatUsers(id: string): Promise<User[]> {
    const chat = await this.findOne({
      where: { id },
      relations: ['users']
    });

    return chat.users;
  }

  async removeUser(chatId: string, userId: string): Promise<void> {
    const chat = await this.findOne({
      relations: ['users'],
      where: { id: chatId }
    });
    chat.users = chat.users.filter((user: IUser) => user.id !== userId);
    chat.save();
  }
}

export default ChatRepository;
