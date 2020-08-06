import React from 'react';
import AddWorkspace from '../../containers/AddWorkspace';
import WorkspaceToolbar from '../../containers/WorkspaceToolbar';
import styles from './styles.module.sass';

const Workspace = () => (
  <div className={styles.workspace}>
    <WorkspaceToolbar />
    <AddWorkspace />
  </div>
);

export default Workspace;
