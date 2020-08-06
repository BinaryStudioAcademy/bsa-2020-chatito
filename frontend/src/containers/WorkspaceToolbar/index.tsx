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
  const url = 'https://miro.medium.com/max/1200/1*PmenN7tXUwWN019qGJQ_SQ.jpeg';
  useEffect(() => {
    const fetched = [{ name: 'first', id: '1', imgUrl: url }, { name: 'first', id: '1', imgUrl: url }];
    // const fetched = props.fetchWorkspaces();
    setWorkspaces(fetched);
  }, []);
  return (
    <div className={styles.workspaceToolbarContainer}>
      {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace} />)}
    </div>
  );
};

const mapStateToProps = (loading: IWorkspaceToolbarState) => (loading);

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceToolbar);
