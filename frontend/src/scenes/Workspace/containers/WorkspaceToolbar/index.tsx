import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WorkspaceItem from './components/WorkspaceItem';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { selectWorkspaceRoutine } from 'scenes/Workspace/routines';
import { ListGroup } from 'react-bootstrap';

interface IProps {
  selectWorkspace: (workspace: IWorkspace) => void;
  workspaces?: IWorkspace[];
  selectedWorkspaceId: string;
  router: (route: string) => void;
}

const WorkspaceToolbar: FunctionComponent<IProps> = ({
  workspaces,
  selectedWorkspaceId,
  router,
  selectWorkspace
}: IProps) => {
  const onAddWorkspaceClick = () => {
    router(Routes.AddWorkspace);
  };

  const onWorkspaceClick = (id: string) => {
    if (workspaces) {
      const selectedWorkspace = workspaces.find(
        workspace => workspace.id === id
      );
      if (selectedWorkspace) {
        selectWorkspace({ ...selectedWorkspace });
      }
    }
  };

  return (
    <div className={styles.workspaceToolbarContainer}>
      <ListGroup variant="flush">
        {workspaces
          ? workspaces.map(workspace => (
            <WorkspaceItem
              key={workspace.id}
              onItemClick={() => onWorkspaceClick(workspace.id)}
              workspace={workspace}
              isSelected={workspace.id === selectedWorkspaceId}
            />
          ))
          : null}

      </ListGroup>
      <div className={styles.plusIconContainer}>
        <FontAwesomeIcon
          className={styles.plusIcon}
          icon={faPlus}
          size="2x"
          onClick={onAddWorkspaceClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  workspaces: state.user.workspaceList,
  selectedWorkspaceId: state.workspace.workspace.id
});

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceToolbar);
