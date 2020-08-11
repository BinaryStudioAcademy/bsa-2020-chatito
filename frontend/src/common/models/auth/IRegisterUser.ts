import { IWorkspace } from "../workspace/IWorkspace";

export interface IRegisterUser {
  email: string;
  password: string;
  fullName: string;
  workspace: IWorkspace;
}
