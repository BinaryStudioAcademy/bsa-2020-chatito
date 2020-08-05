import React from 'react';

interface IWorkspace {
  [key: string]: string;
}

interface IProps {
  workspace: IWorkspace;
}

export default function WorkspaceItem(props: IProps) {
  return (
    <div className="workspaceItem">
      <img src="" alt="" />
    </div>
  );
}
