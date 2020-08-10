import React, { useContext } from 'react';
import styles from './styles.module.sass';
import { ProfileContext, IContext } from '../../../Workspace/containers/Workspace/index';

const ChatBody = () => {
  const {
    setShowProfileHandler,
    setUserDataHandler
  } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars

  return (
    <div className={styles.chatBody}>
      <div />
    </div>
  );
};

export default ChatBody;
