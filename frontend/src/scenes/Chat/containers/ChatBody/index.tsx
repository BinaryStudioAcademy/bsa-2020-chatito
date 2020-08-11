import React, { useContext } from 'react';
import styles from './styles.module.sass';
import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';
import ProfilePreview from 'components/ProfilePreview/index';

const ChatBody = () => {
  const {
    setShowProfileHandler,
    setUserDataHandler
  } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars

  return (
    <div className={styles.chatBody}>
      <div>
        <ProfilePreview
          setShowProfileHandler={setShowProfileHandler}
          setUserDataHandler={setUserDataHandler}
        />
      </div>
    </div>
  );
};

export default ChatBody;
