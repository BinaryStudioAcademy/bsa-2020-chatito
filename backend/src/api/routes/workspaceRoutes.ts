import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { createWorkspace, getWorkspaceUsers } from '../../services/workspaceService';
import { sendInviteLink } from '../../services/inviteLinkService';

const router = Router();

router
  .get('/:id/users', run((req: Request) => getWorkspaceUsers(req.params.id)))
  .post('/', run((req: Request) => createWorkspace({ name: req.body.name, createdByUserId: req.user.id })))
  .post('/:id/invite', run((req: Request) => sendInviteLink({ email: req.body.email, workspaceId: req.params.id })));

export default router;
