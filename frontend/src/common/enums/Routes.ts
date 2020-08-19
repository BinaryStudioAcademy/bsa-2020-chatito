export enum Routes {
  BaseUrl = '/',
  Auth = '/auth/:page',
  SignUp = '/auth/signup',
  SignIn = '/auth/signin',
  ForgotPassword = '/auth/forgot',
  ResetPassword = '/auth/reset/:token',
  Profile = '/profile',
  Workspace = '/w/:whash',
  Chat = '/w/:whash/c/:chash',
  Threads = '/w/:whash/threads',
  Drafts = '/w/:whash/drafts',
  AddWorkspace = '/add-workspace',
  JoinInvitedWorkspace = '/invite/:token',
  Room = '/room',
  Channel = '/channel/:name',
  Direct = '/direct',
  NotExistingPath = '/not-found',
  Maintenance='/maintenance'
}
