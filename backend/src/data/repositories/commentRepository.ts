import { EntityRepository, Repository } from 'typeorm';

import { Comment } from '../entities/Comment';
import { ICreateComment } from '../../common/models/comment/ICreateComment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  addComment(comment: ICreateComment): Promise<Comment> {
    const newComment = this.create(comment);

    return newComment.save();
  }

  getAllPostComments(postId: string): Promise<Comment[]> {
    return this.find({
      relations: ['createdByUser'],
      where: {
        post: { id: postId }
      },
      order: { createdAt: 'ASC' }
    });
  }

  async findByName(postId: string, text: string) {
    const comment = await this.find({ where: { post: postId, text } });
    return comment;
  }
}

export default CommentRepository;
