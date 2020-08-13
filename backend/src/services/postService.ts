import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import { ICreatePost } from '../common/models/post/ICreatePost';
import { IEditPost } from '../common/models/post/IEditPost';
import { IPost } from '../common/models/post/IPost';
import UserRepository from '../data/repositories/userRepository';
import ChatRepository from '../data/repositories/chatRepository';
import { fromPostToPostClient } from '../common/mappers/post';

export const addPost = async (id: string, post: ICreatePost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(post.chatId);
  const newPost: ICreatePost = { ...post, createdByUser: user, chat };
  const createdPost: IPost = await getCustomRepository(PostRepository).addPost(newPost);
  const clientPost = await fromPostToPostClient(createdPost);
  return clientPost;
};

export const editPost = async ({ id, text }: IEditPost) => {
  const editedPost: IPost = await getCustomRepository(PostRepository).editPost(id, text);
  const clientPost = await fromPostToPostClient(editedPost);
  return clientPost;
};
