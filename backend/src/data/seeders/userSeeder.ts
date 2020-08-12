import { getCustomRepository } from 'typeorm';
import { IUser } from '../../common/models/user/IUser';
import { asyncForEach } from '../../common/utils/arrayHelper';
import UserRepository from '../repositories/userRepository';
import { hash } from '../../common/utils/encryptHelper';
import { users } from '../seed-data/users.seed';

const createUserData = async ({ password, ...userData }: IUser) => {
  const passwordHash = await hash(password);
  return { ...userData, password: passwordHash };
};

export default class UserSeeder {
  public static async execute() {
    await asyncForEach(async user => {
      const storeUser = await createUserData(user as IUser);
      await getCustomRepository(UserRepository).addUser(storeUser);
    }, users);
  }
}
