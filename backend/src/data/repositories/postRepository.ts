import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';
import { ICreatePost } from '../../common/models/post/ICreatePost';
import { IGetChatPosts } from '../../common/models/chat/IGetChatPosts';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  getAll(): Promise<Post[]> {
    return this.find();
  }

  getById(id: string): Promise<Post> {
    return this.findOne(id);
  }

  async getAllChatPosts({
    chatId: chat,
    from: skip = undefined,
    count: take = undefined
  }: IGetChatPosts): Promise<Post[]> {
    const posts = await this.find({
      relations: ['createdByUser', 'postReactions', 'chat'],
      where: { chat },
      order: { createdAt: 'DESC' },
      skip,
      take
    });
    return posts.reverse();
  }

  getByIdWithChat(id: string): Promise<Post> {
    return this.findOne({ where: { id }, relations: ['chat'] });
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

  async getPostsByUserId(activeworkspaceid: string, id: string) {
    const posts = await this.createQueryBuilder('post')
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

      .leftJoinAndSelect('post.postReactions', 'reactions')

      .leftJoin('post.comments', 'comments')
      .addSelect([
        'comments.id',
        'comments."createdByUserId"',
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
        'commentuser.status'
      ])

      .leftJoin('comments.post', 'commentsPost')

      .leftJoin('commentsPost.chat', 'commentsPostChat')
      .where('post."createdByUserId" = :id', { id })
      .andWhere('chat."workspaceId" = :activeworkspaceid', { activeworkspaceid })
      .orWhere('comments."createdByUserId" = :id', { id })
      .andWhere('"commentsPostChat"."workspaceId" = :activeworkspaceid', { activeworkspaceid })
      .orderBy('comments."createdAt"', 'ASC')
      .getMany();
    return posts;
  }
}

export default PostRepository;
