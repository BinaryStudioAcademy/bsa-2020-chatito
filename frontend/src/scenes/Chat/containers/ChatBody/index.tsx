import React, { useContext } from 'react';
import styles from './styles.module.sass';
import ProfilePreview from 'components/ProfilePreview/index';

const ChatBody = () => (
  <div className={styles.chatBody}>
    <div>
      <ProfilePreview />
    </div>
  </div>
);

export default ChatBody;
