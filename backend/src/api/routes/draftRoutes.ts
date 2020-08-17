import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { upsertDraftPost, deleteDraftPost } from '../../services/draftService';

const router = Router();

router
  .post('/posts', run((req: Request) => upsertDraftPost(req.user.id, req.body)))
  .delete('/posts', run((req: Request) => deleteDraftPost(req.user.id, req.body)));

export default router;
