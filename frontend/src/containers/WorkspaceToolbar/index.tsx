import React, { useState, useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { fetchWorkspacesRoutine } from './routines';
import styles from './styles.module.sass';
import WorkspaceItem from '../../components/WorkspaceItem';
import { IWorkspaceToolbarState } from './reducer';

interface IWorkspace {
  [key: string]: string;
}

interface IProps {
  fetchWorkspaces: Function;
  loading: boolean;
}

const WorkspaceToolbar: FunctionComponent<IProps> = (props: IProps) => {
  const [workspaces, setWorkspaces]: [IWorkspace[], Function] = useState([]);
  useEffect(() => {
    const fetched = props.fetchWorkspaces();
    setWorkspaces(fetched);
  }, []);
  console.log('workspaces', workspaces);
  return (
    <div className={styles.workspaceContainer}>
      {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace} />)}
    </div>
  );
};

const mapStateToProps = (loading: IWorkspaceToolbarState) => (loading);

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceToolbar);
