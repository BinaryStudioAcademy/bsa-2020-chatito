import React from 'react';
import styles from './styles.module.sass';
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
    <OverlayTrigger
      trigger={['hover', 'hover']}
      placement="right"
      delay={{ show: 200, hide: 250 }}
      overlay={<Tooltip id="workspace-tooltip">{workspace.name}</Tooltip>}
    >
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
    </OverlayTrigger>
  );
}
