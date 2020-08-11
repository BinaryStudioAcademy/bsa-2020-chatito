import { IWorkspace } from "../workspace/IWorkspace";

export interface IInvitedUserRegisteredResponse {
  isRegistered: boolean;
  invitedUserEmail: string;
  workspace: IWorkspace;
}
