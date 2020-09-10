import { EntityRepository, Repository } from 'typeorm';

import { Comment } from '../entities/Comment';
import { ICreateComment } from '../../common/models/comment/ICreateComment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  getById(id: string): Promise<Comment> {
    return this.findOne({ where: { id, isDeleted: false }, relations: ['createdByUser', 'post'] });
  }

  addComment(comment: ICreateComment): Promise<Comment> {
    const newComment = this.create(comment);

    return newComment.save();
  }

  getAllPostComments(postId: string): Promise<Comment[]> {
    return this.find({
      relations: ['createdByUser', 'post'],
      where: {
        post: { id: postId, isDeleted: false },
        isDeleted: false
      },
      order: { createdAt: 'ASC' }
    });
  }

  async editComment(id: string, text: string): Promise<Comment> {
    await this.update(
      id,
      { text, updatedAt: new Date() }
    );
    const editedComment = await this.findOne({ where: { id }, relations: ['createdByUser', 'post'] });

    return editedComment;
  }

  async deleteComment(id: string): Promise<Comment> {
    const deletedComment = await this.findOne({ where: { id }, relations: ['createdByUser', 'post'] });
    await this.update(
      id,
      { isDeleted: true }
    );

    return deletedComment;
  }
}

export default CommentRepository;
