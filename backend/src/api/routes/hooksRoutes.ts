import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addGithubNotification } from '../../services/hooksService';

const router = Router();

router
  .post('/github', run((req: Request) => addGithubNotification(req.body)));

export default router;
