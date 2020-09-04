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

    return this.createQueryBuilder()
      .select('draft_comment')
      .from(DraftComment, 'draft_comment')
      .where('draft_comment.id = :id', { id: draftComment.raw[0].id })
      .leftJoinAndSelect('draft_comment.post', 'post')
      .leftJoinAndSelect('post.chat', 'chat')
      .getOne();
  }

  async deleteDraftComment(userId: string, postId: string) {
    await this.createQueryBuilder()
      .delete()
      .from(DraftComment)
      .where('draft_comment."createdByUserId" = :userId', { userId })
      .andWhere('draft_comment."postId" = :postId', { postId })
      .execute();
  }

  async getByUserAndWorkspace(userId: string, workspaceId: string): Promise<DraftComment[]> {
    return this.createQueryBuilder()
      .select('draft_comment')
      .from(DraftComment, 'draft_comment')
      .leftJoinAndSelect('draft_comment.post', 'post')
      .leftJoinAndSelect('post.chat', 'chat')
      .where('draft_comment."createdByUserId" = :userId', { userId })
      .andWhere('chat."workspaceId" = :workspaceId', { workspaceId })
      .getMany();
  }
}

export default DraftCommentRepository;
