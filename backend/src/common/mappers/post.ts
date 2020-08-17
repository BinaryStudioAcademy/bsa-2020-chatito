import { getCustomRepository } from 'typeorm';
import { fromUserToUserClient } from './user';
import { IPost } from '../models/post/IPost';
import { getUserById } from '../../services/userService';
import { IPostClient } from '../models/post/IPostClient';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo } from './comment';

export const fromPostToPostClient = async (post: IPost): Promise<IPostClient> => {
  const { id, createdAt, text, createdByUserId, chatId } = post;
  const user = await getUserById(createdByUserId);
  const userClient = fromUserToUserClient(user);
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);
  return {
    id,
    createdAt,
    text,
    chatId,
    createdByUser: userClient,
    commentsInfo: fromPostCommentsToCommentsInfo(comments)
  };
};
