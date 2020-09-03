import { EntityRepository, Repository } from 'typeorm';
import { Integration } from '../entities/Integration';
import { ICreateIntegration } from '../../common/models/integration/ICreateIntegration';

@EntityRepository(Integration)
class IntegrationRepository extends Repository<Integration> {
  findByName(name: any) {
    return this.findOne({ name });
  }

  addIntegration(data: ICreateIntegration): Promise<Integration> {
    const integration = this.create(data);

    return integration.save();
  }
}

export default IntegrationRepository;
