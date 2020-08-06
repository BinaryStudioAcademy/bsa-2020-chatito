import { Entity, Column, OneToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column({ nullable: false })
  expiresAt: Date;

  @OneToOne(() => User)
  userId: User;
}
