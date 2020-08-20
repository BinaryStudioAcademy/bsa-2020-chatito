import { getCustomRepository } from 'typeorm';
import { IPost } from '../models/post/IPost';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo } from './comment';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

export const fromPostToPostClient = async (post: IPost) => {
  const { id, postReactions, chat } = post;

  const postReactionsClient = postReactions
    ? postReactions.map(reaction => fromReactionToReactionClient(reaction))
    : [];
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);

  return {
    ...post,
    postReactions: postReactionsClient,
    commentsInfo: fromPostCommentsToCommentsInfo(comments),
    chat: {
      name: chat.name,
      hash: chat.hash
    }
  };
};
