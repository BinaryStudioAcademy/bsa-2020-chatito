import { getCustomRepository } from 'typeorm';
import { fromUserToUserClient } from './user';
import { IPost } from '../models/post/IPost';
import { getUserById } from '../../services/userService';
import { IPostClient } from '../models/post/IPostClient';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo } from './comment';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

export const fromPostToPostClient = async (post: IPost): Promise<IPostClient> => {
  const { id, createdAt, text, createdByUserId, chatId, postReactions } = post;
  const user = await getUserById(createdByUserId);
  const userClient = fromUserToUserClient(user);
  const postReactionsClient = postReactions
    ? postReactions.map(reaction => fromReactionToReactionClient(reaction))
    : [];
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);
  return {
    id,
    createdAt,
    text,
    chatId,
    createdByUser: userClient,
    postReactions: postReactionsClient,
    commentsInfo: fromPostCommentsToCommentsInfo(comments)
  };
};
