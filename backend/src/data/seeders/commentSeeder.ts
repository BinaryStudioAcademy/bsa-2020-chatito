import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '../../common/utils/arrayHelper';
import UserRepository from '../repositories/userRepository';
import PostRepository from '../repositories/postRepository';
import { Comment } from '../entities/Comment';
import { comments } from '../seed-data/comment.seed';

export default class CommentSeeder {
  public static async execute() {
    const users = (await getCustomRepository(UserRepository).getAll()).map(user => (user.id));
    const posts = await getCustomRepository(PostRepository).find();
    await asyncForEach(async comment => {
      const storeComment = comment;
      const userIndex = parseInt(storeComment.createdByUser, 10) - 1;
      storeComment.createdByUser = users[userIndex];
      const post = posts[storeComment.postId - 1];
      await Object.assign(new Comment(), { ...storeComment, post }).save();
    }, comments);
  }
}
