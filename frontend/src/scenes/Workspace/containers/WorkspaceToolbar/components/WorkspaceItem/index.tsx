import React from 'react';
import styles from './styles.module.sass';
import { ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  workspace: IWorkspace;
  isSelected: boolean;
  onItemClick: IBindingAction;
}

export default function WorkspaceItem({
  workspace,
  isSelected,
  onItemClick
}: IProps) {
  const workspaceItemPopover = (
    <Popover id="workspaceItemPopover" className={styles.popOverWindow}>
      <span>
        {workspace.name}
      </span>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'hover']}
      delay={{ show: 300, hide: 0 }}
      rootClose
      placement="right"
      overlay={workspaceItemPopover}
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
