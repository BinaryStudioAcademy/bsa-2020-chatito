import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';
import { Comment } from './Comment';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, user => user.posts)
  createdByUserId: User;

  @ManyToOne(() => Chat, chat => chat.posts)
  chatId: Chat;

  @OneToMany(() => Comment, comment => comment.postId)
  comments: Comment[];
}
