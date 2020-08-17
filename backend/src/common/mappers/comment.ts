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

const maxAvatarsCount = 3;

export const fromPostCommentsToCommentsInfo = (comments: Comment[]) => {
  const count = comments.length;
  const avatars = [];
  for (let i = 0; i < Math.min(count, maxAvatarsCount); i += 1) {
    const { createdByUser: { imageUrl } } = comments[i];
    avatars.push(imageUrl);
  }
  return { count, avatars };
};
