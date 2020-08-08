import { EntityRepository, Repository } from 'typeorm';

import { RefreshToken } from '../entities/RefreshToken';
import { ICreateRefreshToken } from '../../common/models/refreshToken/ICreateRefreshToken';

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {
  async addToken(data: ICreateRefreshToken) {
    const token = this.create(data);

    return token.save();
  }

  deleteToken(id: string) {
    return this.delete(id);
  }

  getById(id: string) {
    return this.findOne(id);
  }
}

export default RefreshTokenRepository;
