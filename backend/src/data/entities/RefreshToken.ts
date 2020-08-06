import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, user => user.refreshToken)
  @JoinColumn({ name: 'tokerOwnerId' })
  user: User;
}
