import { fromUserToUserClient } from './user';
import { IPost } from '../models/post/IPost';
import { getUserById } from '../../services/userService';
import { IPostClient } from '../models/post/IPostClient';
import { IPostReaction } from '../models/postReaction/IPostReaction';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

export const fromPostToPostClient = async (post: IPost): Promise<IPostClient> => {
  const { id, createdAt, text, createdByUserId, chatId, postReactions } = post;
  const user = await getUserById(createdByUserId);
  const userClient = fromUserToUserClient(user);
  const postReactionsClient = postReactions.map(reaction => fromReactionToReactionClient(reaction));
  return {
    id,
    createdAt,
    text,
    chatId,
    createdByUser: userClient,
    postReactions: postReactionsClient
  };
};
