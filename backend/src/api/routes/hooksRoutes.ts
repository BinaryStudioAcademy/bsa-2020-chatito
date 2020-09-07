import { Router, Request } from 'express';
import cors from 'cors';
import { run } from '../../common/utils/routeHelper';
import { addGithubNotification, sendScheduliaMessage } from '../../services/hooksService';
import { ScheduliaIntegrationOptions } from '../../config/cors';

const router = Router();

router
  .post('/github', run((req: Request) => addGithubNotification(req.body)))
  .post('/schedulia', cors(ScheduliaIntegrationOptions), run((req: Request) => sendScheduliaMessage(req.body, req.io)));
export default router;
