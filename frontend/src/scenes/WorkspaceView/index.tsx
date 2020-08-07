import React from 'react';
import styles from './styles.module.sass';

import ChatScene from '../Chat';

const WorkspaceView = () => (
  <div className={styles.workspaceViewContainer}>
    <div className={styles.LeftPanelWrapper}>
      <div style={{ background: '#cbcbdc', height: '100%' }}>Left side chats toolbar</div>
    </div>

    <div className={styles.ChatWrapper}>
      <ChatScene />
    </div>

    <div className={styles.RightPanelWrapper}>
      <div style={{ background: '#cbcbdc', height: '100%' }}>Right side toolbar</div>
    </div>
  </div>
);

export default WorkspaceView;
