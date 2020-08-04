import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { createWorkspace } from '../../services/workspaceService';

const router = Router();

router
  .put('/workspaces', run((req: Request) => createWorkspace({ name: req.body.name, userId: req.user.id })));

export default router;
