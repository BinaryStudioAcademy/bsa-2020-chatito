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
    console.log(id+ '\n'+activeworkspaceid);
    const posts = this.createQueryBuilder("post")
      .leftJoinAndSelect("post.chat", "chat")
      .leftJoinAndSelect("post.comments", "comments")
      .leftJoinAndSelect("comments.post", "commentsPost")
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
