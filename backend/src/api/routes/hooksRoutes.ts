import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addGithubNotification, sendScheduliaMessage } from '../../services/hooksService';

const router = Router();

router
  .post('/github', run((req: Request) => addGithubNotification(req.body)))
  .post('/schedulia', run((req: Request) => sendScheduliaMessage(req.body, req.io)));
export default router;
