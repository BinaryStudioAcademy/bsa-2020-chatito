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

  async deleteUser(id: string): Promise<void> {
    const data = { id };
    const user = await this.getById(id);
    user.remove({ data });
  }

  getByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
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
}

export default UserRepository;
