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
  markAsUnread,
  markAsRead,
  getUnreadById
} from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .delete('/', run((req: Request) => deleteUser(req.user.id)))
  .get('/unread/:id', run((req: Request) => getUnreadById(req.params.id)))
  .put('/', run((req: Request) => editProfile(req.body)))
  .put('/edit-status', run((req: Request) => editStatus({ id: req.body.id, status: req.body.status })))
  .post('/invite', run((req: Request) => checkInvitedUserRegistered(req.body)))
  .post('/add-to-workspace', run((req: Request) => addWorkspaceToUser(req.user.id, req.body.workspaceId)))
  .post('/unread', run((req: Request) => markAsUnread(req.user.id, req.body.postId)))
  .delete('/read/:id', run((req: Request) => markAsRead(req.user.id, req.params.id)));

export default router;
