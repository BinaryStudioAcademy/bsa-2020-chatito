import { getCustomRepository } from 'typeorm';
import { IPost } from '../models/post/IPost';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo } from './comment';
import { getImageUrl } from '../utils/imageHelper';
import { Comment } from '../../data/entities/Comment';
import { IntegrationName } from '../enums/IntegrationName';
import { ClientPostType } from '../enums/ClientPostType';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

const whaleBotMock = {
  id: '1',
  fullName: 'Whale Bot',
  displayName: 'Whale Bot',
  email: 'whale@gmail.com',
  imageUrl: getImageUrl(null),
  password: 'whalePassword'
};

export const fromPostToPostClient = async (post: IPost) => {
  const { id, postReactions, chat, integration, type } = post;
  const postReactionsClient = postReactions
    ? postReactions.map(reaction => fromReactionToReactionClient(reaction))
    : [];
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);
  const integrationName = integration ? integration.name : IntegrationName.None;

  let createdByUser = {
    ...post.createdByUser,
    imageUrl: getImageUrl(post.createdByUser.imageUrl)
  };

  if (integrationName === IntegrationName.Whale) {
    createdByUser = whaleBotMock;
  }

  const postClient = {
    ...post,
    postReactions: postReactionsClient,
    commentsInfo: fromPostCommentsToCommentsInfo(comments),
    chat: {
      name: chat.name,
      hash: chat.hash
    },
    createdByUser,
    integration: integrationName,
    type: type || ClientPostType.CommonPost
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
