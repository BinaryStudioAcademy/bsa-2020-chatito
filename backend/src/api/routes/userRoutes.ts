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
  getUnreadPostsById,
  markAsUnreadPost,
  markAsReadPosts,
  getUnreadCommentsById,
  markAsUnreadComment,
  markAsReadComments,
  getUserByIdWithoutRelations
} from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .get('/:id/basic', run((req: Request) => getUserByIdWithoutRelations(req.params.id)))
  .delete('/', run((req: Request) => deleteUser(req.user.id)))
  .get('/:id/unread-posts', run((req: Request) => getUnreadPostsById(req.params.id)))
  .get('/:id/unread-comments', run((req: Request) => getUnreadCommentsById(req.params.id)))
  .put('/', run((req: Request) => editProfile(req.body)))
  .put('/edit-status', run((req: Request) => editStatus({ id: req.body.id, status: req.body.status })))
  .post('/invite', run((req: Request) => checkInvitedUserRegistered(req.body)))
  .post('/add-to-workspace', run((req: Request) => addWorkspaceToUser(req.user.id, req.body.workspaceId)))
  .post('/unread-post', run((req: Request) => markAsUnreadPost(req.user.id, req.body.postId)))
  .post('/read-posts', run((req: Request) => markAsReadPosts(req.user.id, req.body.postIds)))
  .post('/unread-comment', run((req: Request) => markAsUnreadComment(req.user.id, req.body.commentId)))
  .post('/read-comments', run((req: Request) => markAsReadComments(req.user.id, req.body.commentIds)));
export default router;
