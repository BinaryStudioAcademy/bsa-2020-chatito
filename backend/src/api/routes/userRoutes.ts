import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getUsers,
  getUserById,
  deleteUser,
  editProfile,
  editStatus,
  checkInvitedUserRegistered,
  addWorkspaceToUser,
  markAsUnread
} from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .delete('/', run((req: Request) => deleteUser(req.user.id)))
  .put('/', run((req: Request) => editProfile(req.body)))
  .put('/edit-status', run((req: Request) => editStatus({ id: req.body.id, status: req.body.status })))
  .post('/invite', run((req: Request) => checkInvitedUserRegistered(req.body)))
  .post('/add-to-workspace', run((req: Request) => addWorkspaceToUser(req.user.id, req.body.workspaceId)))
  .post('/unread', run((req: Request) => markAsUnread(req.user.id, req.body.postId)));

export default router;
