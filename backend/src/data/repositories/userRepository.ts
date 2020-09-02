import { EntityRepository, Repository } from 'typeorm';
import { IUserUnreadPosts } from '../../common/models/user/IUserUnreadPosts';
import { User } from '../entities/User';
import { ICreateUser } from '../../common/models/user/ICreateUser';
import { IUserClient } from '../../common/models/user/IUserClient';
import { Chat } from '../entities/Chat';
import { IUser } from '../../common/models/user/IUser';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  addUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);

    return user.save();
  }

  async addWorkspace(id: string, workspaceId: string): Promise<User> {
    await this.createQueryBuilder().relation(User, 'workspaces').of(id).add(workspaceId);
    return this.findOne({ where: { id }, relations: ['workspaces'] });
  }

  async markAsUnreadPost(id: string, postId: string): Promise<string> {
    await this.createQueryBuilder().relation(User, 'unreadPosts').of(id).add(postId);
    return postId;
  }

  async markAsReadPosts(id: string, postId: string): Promise<string> {
    await this.createQueryBuilder().relation(User, 'unreadPosts').of(id).remove(postId);
    return postId;
  }

  async getUnreadPostsById(id: string): Promise<IUserUnreadPosts> {
    const postIds = await this.createQueryBuilder('user')
      .select([
        'user.id'
      ])
      .leftJoinAndSelect('user.unreadPosts', 'unreadposts')
      .where('user.id = :id', { id })
      .getOne();
    return postIds;
  }

  async markAsUnreadComment(id: string, postId: string): Promise<string> {
    await this.createQueryBuilder().relation(User, 'unreadComments').of(id).add(postId);
    return postId;
  }

  async markAsReadComments(id: string, postId: string): Promise<string> {
    await this.createQueryBuilder().relation(User, 'unreadComments').of(id).remove(postId);
    return postId;
  }

  async getUnreadCommentsById(id: string): Promise<IUserUnreadPosts> {
    const postIds = await this.createQueryBuilder('user')
      .select([
        'user.id'
      ])
      .leftJoinAndSelect('user.unreadComments', 'unreadcomments')
      .where('user.id = :id', { id })
      .getOne();
    return postIds;
  }

  getAll(): Promise<User[]> {
    return this.find();
  }

  getById(id: string): Promise<User> {
    return this.findOne({ where: { id }, relations: ['workspaces', 'workspacesCreated', 'chats'] });
  }

  getByIdWithoutRelations(id: string): Promise<IUser> {
    return this.findOne({ where: { id } });
  }

  async getAllUserChats(id: string): Promise<Chat[]> {
    const user = await this.getById(id);
    return user.chats;
  }

  async deleteUser(id: string): Promise<void> {
    const data = { id };
    const user = await this.getById(id);
    user.remove({ data });
  }

  getByEmail(email: string): Promise<User> {
    const user = this.findOne({ where: { email }, relations: ['workspaces'] });
    return user;
  }

  async editUser(id: string, data: IUserClient): Promise<User> {
    await this.update(
      id,
      data
    );

    const user = await this.findOne(id);
    return user;
  }

  async editPassword(id:string, password: string): Promise<User> {
    await this.update(
      id,
      { password }
    );

    const user = await this.findOne(id);

    return user;
  }

  async editStatus(id: string, status: string): Promise<string> {
    await this.update(
      id,
      { status }
    );

    return status;
  }
}

export default UserRepository;
