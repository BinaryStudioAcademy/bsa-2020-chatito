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
      .returning(['id', 'text', 'createdByUser', 'chat', 'hash', 'chat.hash'])
      .execute();

    return this.createQueryBuilder()
      .select('draft_post')
      .from(DraftPost, 'draft_post')
      .where('draft_post.id = :id', { id: draftPost.raw[0].id })
      .leftJoinAndSelect('draft_post.chat', 'chat')
      .getOne();
  }

  async getDraftPost(userId: string, chatId: string) {
    return this.createQueryBuilder()
      .select('draft_post')
      .from(DraftPost, 'draft_post')
      .where('draft_post."createdByUserId" = :userId', { userId })
      .andWhere('draft_post."chatId" = :chatId', { chatId })
      .getOne();
  }

  async deleteDraftPost(userId: string, chatId: string) {
    const res = await this.createQueryBuilder()
      .delete()
      .from(DraftPost)
      .where('draft_post."createdByUserId" = :userId', { userId })
      .andWhere('draft_post."chatId" = :chatId', { chatId })
      .returning(['id'])
      .execute();
    return res.raw[0];
  }

  async getByUserAndWorkspace(userId: string, workspaceId: string): Promise<DraftPost[]> {
    return this.createQueryBuilder()
      .select('draft_post')
      .from(DraftPost, 'draft_post')
      .leftJoinAndSelect('draft_post.chat', 'chat')
      .where('draft_post."createdByUserId" = :userId', { userId })
      .andWhere('chat."workspaceId" = :workspaceId', { workspaceId })
      .getMany();
  }
}

export default DraftPostRepository;
