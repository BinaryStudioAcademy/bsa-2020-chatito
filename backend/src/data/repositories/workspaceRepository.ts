import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/Workspace';
import { ICreateWorkspace, IWorkspaceResponse } from '../../common/models/workspace';

@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> {
  async addWorkspace(data: ICreateWorkspace): Promise<IWorkspaceResponse> {
    const workspace = this.create(data);

    await workspace.save();
    return workspace;
  }

  findByName(name: string) {
    return this.findOne({ name });
  }
}

