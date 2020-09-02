import api from 'common/helpers/apiHelper';
import { IUpsertDraftPost } from 'common/models/draft/IUpsertDraftPost';
import { IDeleteDraftPost } from 'common/models/draft/IDeleteDraftPost';
import { IUpsertDraftComment } from 'common/models/draft/IUpsertDraftComment';
import { IDeleteDraftComment } from 'common/models/draft/IDeleteDraftComment';

export const upsertDraftPost = async (payload: IUpsertDraftPost) => {
  const response = await api.post('/api/drafts/posts', payload);
  return response;
};

export const deleteDraftPost = async (payload: IDeleteDraftPost) => {
  await api.delete('/api/drafts/posts', payload);
};

export const upsertDraftComment = async (payload: IUpsertDraftComment) => {
  const response = await api.post('/api/drafts/comments', payload);
  return response;
};

export const deleteDraftComment = async (payload: IDeleteDraftComment) => {
  const response = await api.delete('/api/drafts/comments', payload);
  return response;
};

export async function fetchDrafts(workspaceId: string) {
  const response = await api.get(`/api/workspaces/${workspaceId}/drafts`);
  return response;
}
