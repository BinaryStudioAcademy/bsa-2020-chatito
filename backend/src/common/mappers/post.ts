import { fromUserToUserClient } from './user';
import { IPost } from '../models/post/IPost';
import { getUserById } from '../../services/userService';
import { IPostClient } from '../models/post/IPostClient';

export const fromPostToPostClient = async (post: IPost): Promise<IPostClient> => {
  const { id, createdAt, text, createdByUserId, chatId } = post;
  const user = await getUserById(createdByUserId);
  const userClient = fromUserToUserClient(user);
  return {
    id,
    createdAt,
    text,
    chatId,
    createdByUser: userClient
  };
};
