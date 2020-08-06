import { EntityRepository, Repository } from 'typeorm';

import { Comment } from '../entities/Comment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {

}

export default CommentRepository;
