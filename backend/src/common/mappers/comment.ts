import { Comment } from '../../data/entities/Comment';
import { fromUserToUserClient } from './user';

export const fromPostCommentsToPostCommentsClient = (comments: Comment[]) => {
  const updated = comments.map(comment => {
    const { id, createdAt, updatedAt, text, postId, createdByUser } = comment;
    return {
      id,
      createdAt,
      updatedAt,
      text,
      postId,
      user: fromUserToUserClient(createdByUser)
    };
  });

  return updated;
};
