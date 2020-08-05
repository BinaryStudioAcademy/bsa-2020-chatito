import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/UserEntity';
import { IRegisterUser } from '../../common/models/user/IRegisterUser';
import { createUserDataMapper } from '../../common/mappers/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async addUser(data: IRegisterUser): Promise<User> {
    const createUserData = createUserDataMapper(data);

    const user = this.create(createUserData);
    await user.save();

    return user;
  }
}

export default UserRepository;
