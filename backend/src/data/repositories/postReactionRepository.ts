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
    const delReaction = await this.createQueryBuilder('postReaction')
      .leftJoinAndSelect('postReaction.user', 'user', 'user.id = :userId', { userId })
      .leftJoinAndSelect('postReaction.post', 'post', 'post.id = :postId', { postId })
      .where('postReaction.reaction = :reaction', { reaction })
      .getOne();

    return this.remove(delReaction);
  }
}

export default PostReactionRepository;
