import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { createWorkspace } from '../../services/workspaceService';

const router = Router();

router
  .post('/', run((req: Request) => createWorkspace({ name: req.body.name, createdByUserId: req.user.id })));

export default router;
