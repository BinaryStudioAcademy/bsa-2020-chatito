import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import { ICreatePost } from '../common/models/post/ICreatePost';
import { IEditPost } from '../common/models/post/IEditPost';
import { IPost } from '../common/models/post/IPost';
import { ICreateComment } from '../common/models/comment/ICreateComment';
import UserRepository from '../data/repositories/userRepository';
import CommentRepository from '../data/repositories/commentRepository';
import { fromPostCommentsToPostCommentsClient } from '../common/mappers/comment';

export const addPost = async (id: string, post: ICreatePost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const newPost: ICreatePost = { ...post, createdByUser: user };
  const createdPost: IPost = await getCustomRepository(PostRepository).addPost(newPost);
  return {
    post: createdPost
  };
};

export const editPost = async ({ id, text }: IEditPost) => {
  const editedPost: IPost = await getCustomRepository(PostRepository).editPost(id, text);
  return editedPost;
};

export const addComment = async (userId: string, postId: string, { text }: { text: string }) => {
  const createComment: ICreateComment = {
    post: { id: postId },
    text,
    createdByUser: { id: userId }
  };
  const newComment = await getCustomRepository(CommentRepository).addComment(createComment);

  return newComment;
};

export const getPostComments = async (postId: string) => {
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(postId);
  return fromPostCommentsToPostCommentsClient(comments);
};

export const getPostsByUserId = async (id: string, activeworkspaceid: string) => {
  const posts = await getCustomRepository(PostRepository).getPostsByUserId(id, activeworkspaceid);
  return posts; 
};
