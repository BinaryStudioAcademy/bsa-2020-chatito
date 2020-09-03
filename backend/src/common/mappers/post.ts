import { getCustomRepository } from 'typeorm';
import { IPost } from '../models/post/IPost';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo, fromCommentsToCommentsWithUserImageUrl } from './comment';
import { getImageUrl } from '../utils/imageHelper';
import { Post } from '../../data/entities/Post';

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
    },
    createdByUser: {
      ...post.createdByUser,
      imageUrl: getImageUrl(post.createdByUser.imageUrl)
    }
  };
};

export const fromThreadsToThreadsClient = (posts: Post[]) => (
  posts.map(post => ({
    ...post,
    createdByUser: {
      ...post.createdByUser,
      imageUrl: getImageUrl(post.createdByUser.imageUrl)
    },
    comments: fromCommentsToCommentsWithUserImageUrl(post.comments)
  }))
);
