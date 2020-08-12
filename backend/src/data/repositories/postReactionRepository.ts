import { EntityRepository, Repository } from 'typeorm';
import { PostReaction } from '../entities/PostReaction';
import { ICreatePostReaction } from '../../common/models/postReaction/ICreatePostReaction';

@EntityRepository(PostReaction)
class PostReactionRepository extends Repository<PostReaction> {
  addReaction(reaction: ICreatePostReaction) {
    const newReaction = this.create(reaction);

    return newReaction.save();
  }

  async updateReaction(id: string, reaction: string) {
    await this.update(id, { reaction });

    return this.findOne(id);
  }

  deleteReaction(id: string) {
    return this.delete(id);
  }
}

export default PostReactionRepository;
