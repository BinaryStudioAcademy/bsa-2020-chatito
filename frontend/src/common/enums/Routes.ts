export enum Routes {
  BaseUrl = '/',
  Auth = '/auth/:page',
  SignUp = '/auth/signup',
  SignIn = '/auth/signin',
  ForgotPassword = '/auth/forgot',
  ResetPassword = '/auth/reset/:token',
  Profile = '/profile',
  Workspace = '/w/:hash',
  AddWorkSpace = '/add-workspace',
  JoinInvitedWorkspace = '/invite/:token',
  Room = '/room',
  Channel = '/channel',
  Direct = '/direct',
  NotExistingPath = '*'
}
