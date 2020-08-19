import { EntityRepository, Repository } from 'typeorm';
import { DraftComment } from '../entities/DraftComment';
import { IUpsertDraftComment } from '../../common/models/draft/IUpsertDraftComment';

@EntityRepository(DraftComment)
class DraftCommentRepository extends Repository<DraftComment> {
  async upsertDraftComment(data: IUpsertDraftComment): Promise<DraftComment> {
    const draftComment = await this.createQueryBuilder()
      .insert()
      .into(DraftComment)
      .values(data)
      .orUpdate({ conflict_target: ['id'], overwrite: ['text'] })
      .returning(['id', 'text', 'createdByUser', 'post'])
      .execute();

    return draftComment.raw[0];
  }

  async deleteDraftComment(userId: string, postId: string) {
    await this.createQueryBuilder()
      .delete()
      .from(DraftComment)
      .where('draft_comment."createdByUserId" = :userId', { userId })
      .andWhere('draft_comment."postId" = :postId', { postId })
      .execute();
  }

  async getByUser(userId: string): Promise<any[]> {
    // const posts = await this.find({
    //   relations: ['createdByUser', 'postReactions'],
    //   where: { chat },
    //   order: { createdAt: 'DESC' }
    // });
    const drafts = await this.createQueryBuilder('draft_comment')
      .select([
        'draft_comment.id',
        'draft_comment.text'
      ])
      // .leftJoin(
      //   'chat.draftPosts',
      //   'draft_post',
      //   'draft_post."chatId" = chat.id AND draft_post."createdByUserId" = :userId',
      //   { userId }
      // )
      // .leftJoin(
      //   'chat.users',
      //   'user'
      // )
      .where('draft_comment."createdByUserId" = :userId', { userId })
      .getMany();
    return drafts;
  }
}

export default DraftCommentRepository;
