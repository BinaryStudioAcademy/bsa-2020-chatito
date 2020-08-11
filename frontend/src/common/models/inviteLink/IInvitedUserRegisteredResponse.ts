import { IWorkspace } from "../workspace/IWorkspace";

export interface IInvitedUserRegisteredResponse {
  invitedUserEmail: string;
  workspace: IWorkspace;
}
