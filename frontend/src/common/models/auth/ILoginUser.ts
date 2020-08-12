import { IWorkspace } from "../workspace/IWorkspace";

export interface ILoginUser {
  email: string;
  password: string;
  workspace: IWorkspace;
}
