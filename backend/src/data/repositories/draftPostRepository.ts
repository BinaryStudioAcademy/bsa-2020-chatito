import { EntityRepository, Repository } from 'typeorm';
import { DraftPost } from '../entities/DraftPost';
import { IUpsertDraftPost } from '../../common/models/draft/IUpsertDraftPost';

@EntityRepository(DraftPost)
class DraftPostRepository extends Repository<DraftPost> {
  async upsertDraftPost(data: IUpsertDraftPost): Promise<DraftPost> {
    const draftPost = await this.createQueryBuilder()
      .insert()
      .into(DraftPost)
      .values(data)
      .orUpdate({ conflict_target: ['id'], overwrite: ['text'] })
      .returning(['id', 'text', 'createdByUser', 'chat'])
      .execute();

    return draftPost.raw[0];
  }

  async deleteDraftPost(userId: string, chatId: string) {
    await this.createQueryBuilder()
      .delete()
      .from(DraftPost)
      .where('draft_post."createdByUserId" = :userId', { userId })
      .andWhere('draft_post."chatId" = :chatId', { chatId })
      .execute();
  }
}

export default DraftPostRepository;
