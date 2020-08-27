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
import { Routine } from 'redux-saga-routines';
import { setCurrentChatRoutine } from 'scenes/Chat/routines';
import { ListGroup } from 'react-bootstrap';

interface IProps {
  workspaces: IWorkspace[];
  selectedWorkspace: IWorkspace;
  router: (route: string) => void;
  selectChat: Routine;
}

const WorkspaceToolbar: FunctionComponent<IProps> = ({
  workspaces,
  selectedWorkspace,
  router,
  selectChat
}: IProps) => {
  const onAddWorkspaceClick = () => {
    router(Routes.AddWorkspace);
  };

  const onWorkspaceClick = (id: string) => {
    if (workspaces) {
      const newSelectedWorkspace = workspaces.find(
        workspace => workspace.id === id
      );
      if (newSelectedWorkspace) {
        router(Routes.Workspace.replace(':whash', newSelectedWorkspace.hash));
        selectChat(null);
      }
    }
  };

  return (
    <div className={styles.workspaceToolbarContainer}>
      <ListGroup variant="flush">
        {workspaces && selectedWorkspace
          ? workspaces.map(workspace => (
            <WorkspaceItem
              key={workspace.id}
              onItemClick={() => onWorkspaceClick(workspace.id)}
              workspace={workspace}
              isSelected={workspace.id === selectedWorkspace.id}
            />
          ))
          : null}

      </ListGroup>
      <div className={styles.plusIconContainer}>
        <FontAwesomeIcon
          className={styles.plusIcon}
          icon={faPlus}
          onClick={onAddWorkspaceClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  workspaces: state.user.workspaceList,
  selectedWorkspace: state.workspace.workspace
});

const mapDispatchToProps = {
  router: push,
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceToolbar);
