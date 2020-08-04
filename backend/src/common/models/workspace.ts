export interface ICreateWorkspace {
  name: string;
  userId: string;
}

export interface IWorkspaceResponse extends ICreateWorkspace {
  id: string;
}
