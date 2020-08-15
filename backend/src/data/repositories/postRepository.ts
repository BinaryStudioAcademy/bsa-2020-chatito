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

  async getAllChatPosts(chatId: string): Promise<Post[]> {
    return this.find({
      relations: ['createdByUser'],
      where: { chat: chatId },
      order: { createdAt: 'ASC' }
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

  getPostsByUserId(activeworkspaceid: string, id: string) {
    const posts = this.createQueryBuilder('post')
      .select([
        'post.createdByUser',
        'post.text',
        'post.createdAt',
        'post.id'
      ])

      .leftJoin('post.chat', 'chat')
      .addSelect([
        'chat.name',
        'chat.id'
      ])

      .leftJoin('post.createdByUser', 'user')
      .addSelect([
        'user.email',
        'user.id',
        'user.fullName',
        'user.displayName',
        'user.imageUrl',
        'user.title',
        'user.status'
      ])

      .leftJoin('post.comments', 'comments')
      .addSelect([
        'comments.id',
        'comments.\"createdByUserId\"',
        'comments.text',
        'comments.createdAt'
      ])

      .leftJoin('comments.createdByUser', 'commentuser')
      .addSelect([
        'commentuser.id',
        'commentuser.email',
        'commentuser.fullName',
        'commentuser.displayName',
        'commentuser.imageUrl',
        'commentuser.title',
        'commentuser.status',
      ])

      .leftJoin('comments.post', 'commentsPost')

      .leftJoin('commentsPost.chat', 'commentsPostChat')
      .where('post.\"createdByUserId\" = :id', { id })
      .andWhere('chat.\"workspaceId\" = :activeworkspaceid', { activeworkspaceid })
      .orWhere('comments.\"createdByUserId\" = :id', { id } )
      .andWhere('\"commentsPostChat\".\"workspaceId\" = :activeworkspaceid', { activeworkspaceid })
      .orderBy('comments.\"createdAt\"', 'ASC')
      .getMany();
    return posts
  }
}

export default PostRepository;
