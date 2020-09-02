import { IWorkspace } from "../workspace/IWorkspace";

export interface ILoginWithGoogle {
  token: string;
  workspace: IWorkspace;
}
