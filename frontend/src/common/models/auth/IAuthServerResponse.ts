import { IUserWithWorkspaces } from 'common/models/user/IUserWithWorkspaces';
export interface IAuthServerResponse {
  accessToken: string;
  refreshToken: string;
  user?: IUserWithWorkspaces;
}
