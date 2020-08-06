import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './UserEntity';
import { Chat } from './ChatEntity';
import { Comment } from './CommentEntity';

@Entity()
export class Post extends AbstractEntity {
  @Column({ nullable: false, length: 400 })
  text: string;

  @ManyToOne(() => User, user => user.posts)
  createdByUserId: User;

  @ManyToOne(() => Chat, chat => chat.posts)
  chatId: Chat;

  @OneToMany(() => Comment, comment => comment.postId)
  comments: Comment[];
}
