import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getUsers, getUserById, deleteUser, editProfile } from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .delete('/:id', run((req: Request) => deleteUser(req.params.id)))
  .put('/', run((req: Request) => editProfile(req.body)));

export default router;
