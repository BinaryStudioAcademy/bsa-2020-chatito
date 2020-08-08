import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/Workspace';
import { User } from '../entities/User';
import { ICreateWorkspace } from '../../common/models/workspace/ICreateWorkspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  addWorkspace(data: ICreateWorkspace, user: User): Promise<Workspace> {
    const workspace = this.create(data);
    workspace.createdByUser = user;

    return workspace.save();
  }

  findByName(name: string) {
    return this.findOne({ name });
  }
}

export default WorkspaceRepository;
