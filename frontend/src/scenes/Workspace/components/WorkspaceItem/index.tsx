import React from 'react';
import styles from './styles.module.sass';

interface IWorkspace {
  [key: string]: string;
}

interface IProps {
  workspace: IWorkspace;
}

export default function WorkspaceItem({ workspace }: IProps) {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.item} src={workspace.imgUrl} alt="workspaceItem" />
    </div>
  );
}
