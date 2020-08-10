import { Router, Request, Response } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getUsers, getUserById, deleteUser, editProfile, editStatus } from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .get('/me', run((req: Request) => getUserById(req.user.id)))
  .delete('/', (req: Request, res: Response) => {
    deleteUser(req.user.id);
    res.status(200).send();
  })
  .put('/', run((req: Request) => editProfile(req.body)))
  .put('/edit-status', run((req: Request) => editStatus({ id: req.body.id, status: req.body.status })));

export default router;
