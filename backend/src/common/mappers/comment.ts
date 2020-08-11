import { Comment } from '../../data/entities/Comment';
import { fromUserToUserClient } from './user';

export const fromPostCommentsToPostCommentsClient = (comments: Comment[]) => {
  const updated = comments.map(comment => {
    const { createdByUser } = comment;
    return {
      ...comment,
      createdByUser: fromUserToUserClient(createdByUser)
    };
  });

  return updated;
};
