import { EntityRepository, Repository } from 'typeorm';
import { PostReaction } from '../entities/PostReaction';
import { ICreatePostReaction } from '../../common/models/postReaction/ICreatePostReaction';
import { IDeletePostReaction } from '../../common/models/postReaction/IDeletePostReaction';

@EntityRepository(PostReaction)
class PostReactionRepository extends Repository<PostReaction> {
  addReaction(reaction: ICreatePostReaction) {
    const newReaction = this.create(reaction);

    return newReaction.save();
  }

  async deleteReaction({ userId, postId, reaction }: IDeletePostReaction) {
    const deletedReaction = await this.createQueryBuilder('postReaction')
      .leftJoinAndSelect('postReaction.user', 'user')
      .leftJoinAndSelect('postReaction.post', 'post')
      .where('user.id = :userId', { userId })
      .andWhere('post.id = :postId', { postId })
      .andWhere('postReaction.reaction = :reaction', { reaction })
      .getOne();

    return this.remove(deletedReaction);
  }
}

export default PostReactionRepository;
