import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { upsertDraftPost,
  deleteDraftPost,
  upsertDraftComment,
  deleteDraftComment,
  getAll } from '../../services/draftService';

const router = Router();

router
  .get('/', run((req: Request) => getAll(req.user.id)))
  .post('/posts', run((req: Request) => upsertDraftPost(req.user.id, req.body)))
  .delete('/posts', run((req: Request) => deleteDraftPost(req.user.id, req.body)))
  .post('/comments', run((req: Request) => upsertDraftComment(req.user.id, req.body)))
  .delete('/comments', run((req: Request) => deleteDraftComment(req.user.id, req.body)));

export default router;
