import React from 'react';
import styles from './styles.module.sass';

import Header from '../Header/index';
import WorkspaceToolbar from '../WorkspaceToolbar';
import ChatScene from 'scenes/Chat';
import ChatToolbar from '../ChatToolbar';

const Workspace = () => (
  <div className={styles.mainContainer}>
    <Header />
    <div className={styles.contentContainer}>
      <WorkspaceToolbar />

      <div className={styles.workspaceViewContainer}>

        <div className={styles.LeftPanelWrapper}>
          <ChatToolbar />
        </div>

        <div className={styles.ChatWrapper}>
          <ChatScene />
        </div>

        <div className={styles.RightPanelWrapper}>
          <div style={{ background: '#cbcbdc', height: '100%' }}>Right side toolbar</div>
        </div>

      </div>

    </div>
  </div>
);

export default Workspace;
