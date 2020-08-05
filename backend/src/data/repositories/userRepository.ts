import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/UserEntity';
import { ICreateUser } from '../../common/models/user/ICreateUser';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async addUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);
    await user.save();

    return user;
  }
}

export default UserRepository;
