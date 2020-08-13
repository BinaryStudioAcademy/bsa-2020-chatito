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
      where: {
        chatId
      }
    });
  }

  addPost(post: ICreatePost): Promise<Post> {
    const newPost = this.create(post);

    return newPost.save();
  }

  async editPost(id:string, text: string): Promise<Post> {
    await this.update(
      id,
      { text, updatedAt: new Date() }
    );

    const editedPost = await this.findOne(id);
    return editedPost;
  }

  getPostsByUserId(id: string, activeworkspaceid: string) {
    const posts = this.createQueryBuilder("post")
      .select("post.createdByUser")
      .addSelect("post.text")
      .addSelect("post.createdAt")
      .addSelect("post.id")

      .leftJoin("post.chat", "chat")
      .addSelect("chat.name")

      .leftJoin("post.createdByUser", "user")
      .addSelect("user.id")
      .addSelect("user.email")
      .addSelect("user.fullName")
      .addSelect("user.displayName")
      .addSelect("user.imageUrl")
      .addSelect("user.title")
      .addSelect("user.status")

      .leftJoin("post.comments", "comments")
      .leftJoin("comments.createdByUser", "commentuser")
      .addSelect("commentuser.id")
      .addSelect("commentuser.email")
      .addSelect("commentuser.fullName")
      .addSelect("commentuser.displayName")
      .addSelect("commentuser.imageUrl")
      .addSelect("commentuser.title")
      .addSelect("commentuser.status")
      
      .addSelect("comments.id")
      .addSelect("comments.\"createdByUserId\"")
      .addSelect("comments.text")
      .addSelect("comments.createdAt")
      .leftJoin("comments.post", "commentsPost")
      
      .leftJoinAndSelect("commentsPost.chat", "commentsPostChat")
      .where("post.\"createdByUserId\" = :id", { id })
      .andWhere("chat.\"workspaceId\" = :activeworkspaceid", { activeworkspaceid })
      .orWhere("comments.\"createdByUserId\" = :id", { id } )
      .andWhere("\"commentsPostChat\".\"workspaceId\" = :activeworkspaceid", { activeworkspaceid })
      .getMany();
    return posts
  }
}

export default PostRepository;
