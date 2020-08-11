import React from 'react';
import styles from './styles.module.sass';
import { ListGroup } from 'react-bootstrap';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  workspace: IWorkspace;
  isSelected: boolean;
  onItemClick: () => void;
}

export default function WorkspaceItem({
  workspace,
  isSelected,
  onItemClick
}: IProps) {
  return (
    <ListGroup.Item
      onClick={onItemClick}
      className={isSelected ? styles.selectedItem : styles.item}
    >
      <div className={isSelected ? styles.selectedAvatar : styles.avatar}>
        {workspace.imageUrl ? (
          <img className={styles.itemWithAvatar} src={workspace.imageUrl} alt="WorkspaceItem" />
        ) : (
          <span className={styles.itemWithoutAvatar}>{workspace.name[0]}</span>
        )}
      </div>
      <span className={isSelected ? styles.selectedItemName : styles.itemName}>{workspace.name}</span>
    </ListGroup.Item>
  );
}
