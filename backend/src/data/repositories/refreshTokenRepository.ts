import { EntityRepository, AbstractRepository } from 'typeorm';
import { IRefreshToken } from '../../common/models/IRefreshToken';
import { RefreshToken } from '../entities/RefreshToken';

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends AbstractRepository<RefreshToken> {
  async addToken(data: IRefreshToken) {
    const token = this.repository.create(data);
    await this.manager.save(token);

    return token;
  }

  deleteToken(id: string) {
    return this.repository.delete(id);
  }

  getById(id: string) {
    return this.repository.findOne(id);
  }
}

export default RefreshTokenRepository;
