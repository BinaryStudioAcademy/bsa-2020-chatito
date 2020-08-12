export enum Routes {
  BaseUrl = '/',
  Auth = '/auth/:page',
  SignUp = '/auth/signup',
  SignIn = '/auth/signin',
  ForgotPassword = '/auth/forgot',
  ResetPassword = '/auth/reset/:token',
  Profile = '/profile',
  Workspace = '/w/:hash',
  AddWorkspace = '/add-workspace',
  Room = '/room',
  Channel = '/channel/:name',
  Direct = '/direct',
  NotExistingPath = '*'
}
