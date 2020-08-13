import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';
import { ICreatePost } from '../../common/models/post/ICreatePost';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  getAll(): Promise<Post[]> {
    return this.find();
  }

  getById(id: string): Promise<Post> {
    return this.findOne(id);
  }

  getAllChatPosts(chatId: string): Promise<Post[]> {
    return this.find({
      relations: ['createdByUser'],
      where: { chat: chatId }
    });
  }

  addPost(post: ICreatePost): Promise<Post> {
    const newPost = this.create(post);
    return newPost.save();
  }

  async editPost(id: string, text: string): Promise<Post> {
    await this.update(
      id,
      { text, updatedAt: new Date() }
    );

    const editedPost = await this.findOne(id);
    return editedPost;
  }
}

export default PostRepository;
