import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import { ICreatePost } from '../common/models/post/ICreatePost';
import { IEditPost } from '../common/models/post/IEditPost';
import { IPost } from '../common/models/post/IPost';
import UserRepository from '../data/repositories/userRepository';

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
