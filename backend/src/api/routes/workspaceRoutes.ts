import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { createWorkspace, getWorkspaceUsers, getThreads } from '../../services/workspaceService';
import { getAll as getDrafts } from '../../services/draftService';
import { sendInviteLink } from '../../services/inviteLinkService';

const router = Router();

router
  .get('/:id/users', run((req: Request) => getWorkspaceUsers(req.params.id)))
  .get('/:id/drafts', run((req: Request) => getDrafts(req.user.id, req.params.id)))
  .get('/:workspaceId/users/:userId/posts', run((req: Request) => (
    getThreads(req.params.workspaceId, req.params.userId)
  )))
  .post('/', run((req: Request) => createWorkspace({ name: req.body.name, createdByUserId: req.user.id })))
  .post('/:id/invite', run((req: Request) => sendInviteLink({ email: req.body.email, workspaceId: req.params.id })));

export default router;
