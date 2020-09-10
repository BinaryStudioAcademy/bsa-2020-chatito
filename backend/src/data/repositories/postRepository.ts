import { EntityRepository, Repository, Brackets, getCustomRepository } from 'typeorm';
import { Post } from '../entities/Post';
import { ICreatePost } from '../../common/models/post/ICreatePost';
import { IGetChatPosts } from '../../common/models/chat/IGetChatPosts';
import { IGetNavigatePost } from '../../common/models/chat/IGetNavigatePost';
import CommentRepository from './commentRepository';
import DraftCommentRepository from './draftCommentRepository';
import PostReactionRepository from './postReactionRepository';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  getAll(): Promise<Post[]> {
    return this.find({ where: { isDeleted: false } });
  }

  getById(id: string): Promise<Post> {
    return this.findOne({ where: { id }, relations: ['createdByUser', 'chat', 'draftComments'] });
  }

  async getAllChatPosts({
    userId,
    chatId,
    from: skip = undefined,
    count: take = undefined
  }: IGetChatPosts): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.text',
        'post.integration',
        'user.id',
        'user.fullName',
        'user.displayName',
        'user.imageUrl',
        'user.email',
        'draft_comment.id',
        'draft_comment.text',
        'chat.name',
        'chat.hash'
      ])
      .leftJoin(
        'post.draftComments',
        'draft_comment',
        'draft_comment."postId" = post.id AND draft_comment."createdByUserId" = :userId',
        { userId }
      )
      .leftJoin(
        'post.createdByUser',
        'user'
      )
      .leftJoinAndSelect(
        'post.postReactions',
        'post_reaction'
      )
      .leftJoin(
        'post.chat',
        'chat'
      )
      .where('post.chat = :chatId', { chatId })
      .andWhere('post.isDeleted = false')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    return posts.reverse();
  }

  async getAllNavChatPosts({
    userId,
    chatId,
    postCreatedAt,
    from: skip = undefined,
    count: take = undefined
  }: IGetNavigatePost): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.text',
        'user.id',
        'user.fullName',
        'user.displayName',
        'user.imageUrl',
        'draft_comment.id',
        'draft_comment.text',
        'post_reaction.reaction',
        'post_reaction."userId"',
        'chat.name',
        'chat.hash'
      ])
      .leftJoin(
        'post.draftComments',
        'draft_comment',
        'draft_comment."postId" = post.id AND draft_comment."createdByUserId" = :userId',
        { userId }
      )
      .leftJoin(
        'post.createdByUser',
        'user'
      )
      .leftJoin(
        'post.postReactions',
        'post_reaction'
      )
      .leftJoin(
        'post.chat',
        'chat'
      )
      .where('post.chat = :chatId', { chatId })
      .andWhere('post.createdAt >= :postCreatedAt', { postCreatedAt })
      .andWhere('post.isDeleted = false')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

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

    const editedPost = await this.findOne({ where: { id }, relations: ['createdByUser', 'chat', 'comments'] });

    return editedPost;
  }

  async deletePost(id: string): Promise<Post> {
    const deletedPost = await this.findOne(id);
    this.update(
      id,
      { isDeleted: true }
    );
    getCustomRepository(CommentRepository).update({ post: { id } }, { isDeleted: true });
    getCustomRepository(DraftCommentRepository).delete({ post: { id } });
    getCustomRepository(PostReactionRepository).delete({ post: { id } });

    return deletedPost;
  }

  async getPostsByUserId(activeworkspaceid: string, id: string) {
    const posts = await this.createQueryBuilder('post')
      .select([
        'post.createdByUser',
        'post.text',
        'post.createdAt',
        'post.id',
        'post.integration'
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

      .leftJoinAndSelect('post.postReactions', 'post_reaction')

      .leftJoin('post.comments', 'allcomments')
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

      .where(new Brackets(qb => {
        qb
          .where('post."createdByUserId" = :id', { id })
          .andWhere('chat."workspaceId" = :activeworkspaceid', { activeworkspaceid })
          .andWhere('post.isDeleted = false')
          .andWhere('comments.isDeleted = false')
          .andWhere('comments."postId" = post.id');
      }))
      .orWhere(new Brackets(qb => {
        qb
          .where('allcomments."createdByUserId" = :id', { id })
          .andWhere('allcomments.isDeleted = false')
          .andWhere('"commentsPostChat"."workspaceId" = :activeworkspaceid', { activeworkspaceid });
      }))
      .orderBy('comments."createdAt"', 'DESC')
      .getMany();
    return posts;
  }
}

export default PostRepository;
