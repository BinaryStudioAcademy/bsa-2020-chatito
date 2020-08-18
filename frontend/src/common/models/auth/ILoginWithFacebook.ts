import { IWorkspace } from "../workspace/IWorkspace";

export interface ILoginWithFacebook {
  accessToken: string;
  workspace: IWorkspace;
}
