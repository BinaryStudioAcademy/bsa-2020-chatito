import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column({ type: 'bigint' })
  expiresAt: number;

  @ManyToOne(() => User, user => user.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((token: RefreshToken) => token.user)
  readonly userId: string;
}
