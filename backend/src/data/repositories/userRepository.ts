import { User } from '../entities/User/UserEntity';
import { IRegisterUser, IUser } from '../../common/models/user';

class UserRepository {
  constructor(private model: any) {
    this.model = model;
  }

  async addUser(data: IRegisterUser): Promise<IUser> {
    const user = this.model.create({
      ...data,
      displayName: data.fullName
    });

    await user.save();
    return user;
  }
}

export default new UserRepository(User);
