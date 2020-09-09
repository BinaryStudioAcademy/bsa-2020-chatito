import { Comment } from '../../data/entities/Comment';
import { fromUserToUserClient } from './user';
import { getImageUrl } from '../utils/imageHelper';

export const fromPostCommentsToPostCommentsClient = (comments: Comment[]) => {
  const updated = comments.map(comment => {
    const { id, createdAt, updatedAt, text, postId, createdByUser, post } = comment;

    return {
      id,
      createdAt,
      updatedAt,
      text,
      postId,
      createdByUser: fromUserToUserClient(createdByUser),
      chatId: post.chatId
    };
  });

  return updated;
};

const maxAvatarsCount = 3;

export const fromPostCommentsToCommentsInfo = (comments: Comment[]) => {
  const count = comments.length;
  const lastAt = comments.length > 0 ? comments[0].createdAt : new Date();
  const avatars = [];
  for (let i = 0; i < Math.min(count, maxAvatarsCount); i += 1) {
    const { createdByUser: { imageUrl } } = comments[i];
    avatars.push(imageUrl);
  }
  return { count, lastAt, avatars };
};

export const fromCommentsToCommentsWithUserImageUrl = (comments: Comment[]) => (
  comments.map(comment => ({
    ...comment,
    createdByUser: {
      ...comment.createdByUser,
      imageUrl: getImageUrl(comment.createdByUser.imageUrl)
    }
  }))
);
