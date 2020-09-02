import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '../../common/utils/arrayHelper';
import UserRepository from '../repositories/userRepository';
import { Workspace } from '../entities/Workspace';
import { workspaces } from '../seed-data/workspaces.seed';

export default class WorkspaceSeeder {
  public static async execute() {
    const users = (await getCustomRepository(UserRepository).getAll()).map(user => (user.id));
    await asyncForEach(async workspace => {
      const storeWorkspace = workspace;
      const userIndex = parseInt(storeWorkspace.createdByUser, 10) - 1;
      storeWorkspace.createdByUser = users[userIndex];
      await Object.assign(new Workspace(), storeWorkspace).save();
    }, workspaces);
  }
}
