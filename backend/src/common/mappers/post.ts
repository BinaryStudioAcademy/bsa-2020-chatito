import { getCustomRepository } from 'typeorm';
import { IPost } from '../models/post/IPost';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo } from './comment';
import { getImageUrl } from '../utils/imageHelper';
import { Comment } from '../../data/entities/Comment';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

export const fromPostToPostClient = async (post: IPost) => {
  const { id, postReactions, chat, integration, type } = post;

  const postReactionsClient = postReactions
    ? postReactions.map(reaction => fromReactionToReactionClient(reaction))
    : [];
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);
  const postClient = {
    ...post,
    postReactions: postReactionsClient,
    commentsInfo: fromPostCommentsToCommentsInfo(comments),
    chat: {
      name: chat.name,
      hash: chat.hash
    },
    createdByUser: {
      ...post.createdByUser,
      imageUrl: getImageUrl(post.createdByUser.imageUrl)
    },
    integration: integration.name,
    type
  };
  return postClient;
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
