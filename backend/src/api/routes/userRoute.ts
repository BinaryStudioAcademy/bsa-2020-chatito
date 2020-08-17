import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getUsers,
  getUserById,
  deleteUser,
  editProfile,
  editStatus,
  checkInvitedUserRegistered,
} from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .delete('/', run((req: Request) => deleteUser(req.user.id)))
  .put('/', run((req: Request) => editProfile(req.body)))
  .put('/edit-status', run((req: Request) => editStatus({ id: req.body.id, status: req.body.status })))
  .post('/invite', run((req: Request) => checkInvitedUserRegistered(req.body)));
  
export default router;
