import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/Workspace';
import { ICreateWorkspace } from '../../common/models/workspace/ICreateWorkspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  addWorkspace(data: ICreateWorkspace): Promise<Workspace> {
    const workspace = this.create(data);

    return workspace.save();
  }

  findByName(name: string) {
    return this.findOne({ name });
  }
}

export default WorkspaceRepository;
