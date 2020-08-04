import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User/UserEntity';
import { IRegisterUser, IUser } from '../../common/models/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async addUser(data: IRegisterUser): Promise<IUser> {
    const user = this.create({
      ...data,
      displayName: data.fullName
    });

    await user.save();
    return user;
  }
}

export default UserRepository;
