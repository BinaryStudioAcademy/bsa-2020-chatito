import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { ICreateUser } from '../../common/models/user/ICreateUser';
import { IUserClient } from '../../common/models/user/IUserClient';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  addUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);

    return user.save();
  }

  getAll(): Promise<User[]> {
    return this.find();
  }

  getById(id: string): Promise<User> {
    return this.findOne(id);
  }

  deleteUser(id: string) {
    const data = { id };
    this.getById(id).then(user => user.remove({ data }));
  }

  getByEmail(email: string): Promise<User> {
    const user = this.findOne({ where: { email }, relations: ['workspaces'] });
    return user;
  }

  async editUser(id:string, data: IUserClient): Promise<User> {
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

  async editPassword(id:string, password: string): Promise<User> {
    await this.update(
      id,
      { password }
    );

    const user = await this.findOne(id);

    return user;
  }
}

export default UserRepository;
