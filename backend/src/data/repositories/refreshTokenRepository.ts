import { EntityRepository, Repository } from 'typeorm';

import { RefreshToken } from '../entities/RefreshToken';
import { IRefreshToken } from '../../common/models/IRefreshToken';

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {
  async addToken(data: IRefreshToken) {
    const token = this.create(data);

    return this.save(token);
  }

  deleteToken(id: string) {
    return this.delete(id);
  }

  getById(id: string) {
    return this.findOne(id);
  }
}

export default RefreshTokenRepository;
