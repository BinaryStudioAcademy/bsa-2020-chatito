import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '../../common/utils/arrayHelper';
import IntegrationRepository from '../repositories/integrationRepository';
import { integrations } from '../seed-data/integration.seed';

export default class IntegrationSeeder {
  public static async execute() {
    await asyncForEach(async integration => {
      await getCustomRepository(IntegrationRepository).addIntegration(integration);
    }, integrations);
  }
}
