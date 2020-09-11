import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';
import { ICreateChat } from '../../common/models/chat/ICreateChat';
import { User } from '../entities/User';
import { IUser } from '../../common/models/user/IUser';
import { ChatType } from '../../common/enums/ChatType';

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  addChat(chat: ICreateChat): Promise<Chat> {
    const newChat = this.create(chat);
    return newChat.save();
  }

  getById(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['posts'] });
  }

  async getPublicChannelByHash(hash: string, userId: string) {
    const chat = await this.createQueryBuilder('chat')
      .select([
        'chat.id',
        'chat.name',
        'chat.type',
        'chat.hash',
        'chat.description',
        'chat.createdByUser.id',
        'chat.isPrivate',
        'user.id',
        'user.imageUrl',
        'user.createdAt',
        'user.fullName',
        'user.status',
        'user.title',
        'user.email',
        'user.displayName',
        'draft_post.id',
        'draft_post.text'
      ])
      .leftJoin(
        'chat.draftPosts',
        'draft_post',
        'draft_post."chatId" = chat.id AND draft_post."createdByUserId" = :userId',
        { userId }
      )
      .leftJoin(
        'chat.users',
        'user'
      )
      .where('chat.hash = :hash', { hash })
      .andWhere('chat."isPrivate" = false')
      .andWhere('chat.type = :type', { type: ChatType.Channel })
      .getOne();
    return chat;
  }

  async getNameAndTypeAndIdById(id: string) {
    const chatInfoToSend = await this.createQueryBuilder('chat')
      .select([
        'chat.name',
        'chat.type',
        'chat.id'
      ])
      .where('chat."id" = :id', { id })
      .getOne();
    return chatInfoToSend;
  }

  getByIdWithUsers(id: string): Promise<Chat> {
    return this.findOne({ where: { id }, relations: ['users'] });
  }

  async getAllByWorkspaceIdAndUserId(workspaceId: string, userId: string) {
    const chats = await this.createQueryBuilder('chat')
      .select([
        'chat.id',
        'chat.name',
        'chat.type',
        'chat.hash',
        'chat.description',
        'chat.createdByUser.id',
        'chat.isPrivate',
        'user.id',
        'user.imageUrl',
        'user.createdAt',
        'user.fullName',
        'user.status',
        'user.title',
        'user.email',
        'user.displayName',
        'draft_post.id',
        'draft_post.text'
      ])
      .leftJoin(
        'chat.workspace',
        'workspace'
      )
      .leftJoin(
        'chat.draftPosts',
        'draft_post',
        'draft_post."chatId" = chat.id AND draft_post."createdByUserId" = :userId',
        { userId }
      )
      .leftJoin(
        'chat.users',
        'user'
      )
      .leftJoin(
        'chat.users',
        'currentUser'
      )
      .where('workspace.id = :workspaceId', { workspaceId })
      .andWhere('currentUser.id = :userId', { userId })
      .getMany();

    return chats;
  }

  async getBrowserChannelsByWorkspaceId(workspaceId: string) {
    const channels = await this.createQueryBuilder('chat')
      .select([
        'chat.id',
        'chat.name',
        'chat.description',
        'chat.hash',
        'chat.isPrivate',
        'chat.createdAt',
        'user.id'
      ])
      .leftJoin('chat.users', 'user')
      .leftJoin('chat.workspace', 'workspace')
      .where('workspace.id = :workspaceId', { workspaceId })
      .andWhere('chat.type = :type', { type: ChatType.Channel })
      .getMany();
    return channels;
  }

  async getAllByUser(userId: string): Promise<any> {
    const chats = await this.createQueryBuilder('chat')
      .select([
        'chat.id',
        'chat.name',
        'chat.type',
        'chat.hash',
        'chat.isPrivate',
        'chat.description',
        'user.id',
        'user.imageUrl',
        'draft_post.id',
        'draft_post.text'
      ])
      .leftJoin(
        'chat.draftPosts',
        'draft_post',
        'draft_post."chatId" = chat.id AND draft_post."createdByUserId" = :userId',
        { userId }
      )
      .leftJoin(
        'chat.users',
        'user'
      )
      .leftJoin(
        'chat.users',
        'currentUser'
      )
      .where('currentUser.id = :userId', { userId })
      .getMany();

    return chats;
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

  async getGithubRepositoryChat(repositoryName: string, repositoryOwner: string) {
    const chat = await this.createQueryBuilder('chat')
      .select([
        'chat.id',
        'chat.name'
      ])
      .leftJoin(
        'chat.createdByUser',
        'user'
      )
      .where('chat.type = :chatType', { chatType: ChatType.GithubRepository })
      .andWhere('chat.name = :repositoryName', { repositoryName })
      .andWhere('user.githubUsername = :repositoryOwner', { repositoryOwner })
      .getOne();

    return chat;
  }

  async getCommonDirectChat(id1: string, id2: string, wpId: string): Promise<Chat> {
    const chat = await this.createQueryBuilder('chat')
      .leftJoin(
        'chat.workspace',
        'wp'
      )
      .leftJoinAndSelect(
        'chat.users',
        'user'
      )
      .where('chat.type = :chatType', { chatType: ChatType.DirectMessage })
      .andWhere('wp.id = :wpId', { wpId })
      .andWhere('user.id IN (:...idArr)', { idArr: [id1, id2] })
      .getMany();

    return chat.find(c => c.users.length === 2);
  }
}

export default ChatRepository;
