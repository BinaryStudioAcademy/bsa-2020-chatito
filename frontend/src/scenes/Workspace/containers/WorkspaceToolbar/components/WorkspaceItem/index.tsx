import React from 'react';
import styles from './styles.module.sass';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  workspace: IWorkspace;
  id: string;
}

export default function WorkspaceItem({ workspace }: IProps) {
  const currentId = '2';
  return (
    <div className={styles.workspaceItemBlock}>
      {currentId === workspace.id ? (
        <div className={`${styles.imageContainer} ${styles.activeWorkspace}`}>
          <img className={styles.item} src={workspace.imageUrl} alt="workspaceItem" />
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <img className={styles.item} src={workspace.imageUrl} alt="workspaceItem" />
        </div>
      )}
    </div>
  );
}
