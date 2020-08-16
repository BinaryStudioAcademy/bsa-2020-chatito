import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/Workspace';
import { User } from '../entities/User';
import { ICreateWorkspace } from '../../common/models/workspace/ICreateWorkspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  addWorkspace(data: ICreateWorkspace, user: User): Promise<Workspace> {
    const workspace = this.create(data);
    workspace.createdByUser = user;
    workspace.users = [user];

    return workspace.save();
  }

  async findByName(name: string) {
    const workspace = await this.findOne({ name });
    return workspace;
  }

  getById(id: string): Promise<Workspace> {
    return this.findOne(id);
  }
}

export default WorkspaceRepository;
