import { getCustomRepository } from 'typeorm';
import { IPost } from '../models/post/IPost';
import { IPostReaction } from '../models/postReaction/IPostReaction';
import CommentRepository from '../../data/repositories/commentRepository';
import { fromPostCommentsToCommentsInfo, fromCommentsToCommentsWithUserImageUrl } from './comment';
import { getImageUrl } from '../utils/imageHelper';
import { Post } from '../../data/entities/Post';
import { IntegrationType } from '../enums/IntegrationType';
import { ClientPostType } from '../enums/ClientPostType';

export const fromReactionToReactionClient = ({ reaction, userId }: IPostReaction) => ({
  reaction, userId
});

const whaleBotMock = {
  id: '1',
  fullName: 'Whale Bot',
  displayName: 'Whale Bot',
  email: 'whale@gmail.com',
  imageUrl: 'https://img.icons8.com/flat_round/64/000000/whale--v1.png',
  password: '',
  originalUserId: '',
  audio: 'https://bsa-chatito-storage.s3.amazonaws.com/audios/Tuturu.mp3'
};

const scheduliaBotMock = {
  id: '2',
  fullName: 'Schedulia Bot',
  displayName: 'Schedulia Bot',
  email: 'Schedulia@gmail.com',
  imageUrl: 'https://schedulia.xyz/img/logo.02b82edf.svg',
  password: '',
  audio: 'https://bsa-chatito-storage.s3.amazonaws.com/audios/Tuturu.mp3',
  originalUserId: ''
};

export const fromPostToPostClient = async (post: IPost) => {
  const { id, postReactions, chat, integration, type } = post;
  const postReactionsClient = postReactions
    ? postReactions.map(reaction => fromReactionToReactionClient(reaction))
    : [];
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(id);
  let createdByUser = {
    ...post.createdByUser,
    imageUrl: getImageUrl(post.createdByUser.imageUrl)
  };

  if (integration === IntegrationType.Whale) {
    whaleBotMock.originalUserId = post.createdByUser.id;
    createdByUser = whaleBotMock;
  } else if (integration === IntegrationType.Schedulia) {
    scheduliaBotMock.originalUserId = post.createdByUser.id;
    createdByUser = scheduliaBotMock;
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
    integration,
    type: type || ClientPostType.CommonPost
  };

  return postClient;
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
