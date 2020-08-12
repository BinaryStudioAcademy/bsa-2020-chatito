import React, { useContext } from 'react';
import styles from './styles.module.sass';
import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';

const ChatBody = () => {
  const {
    setShowProfileHandler,
    setUserDataHandler,
    showThreadHandler
  } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars
  const postMock = {
    user: {
      id: '87d8eee5-6655-422a-a0b8-05a4709b626c',
      fullName: 'demo',
      email: 'demo10@demo.com',
      displayName: 'demo'
    },
    id: 'e4bf2dab-1fc1-4c9b-a75e-67c23418d9c2',
    text: 'Post test',
    createdAt: new Date('2020-08-11T12:40:36.072Z')
  };
  return (
    <div className={styles.chatBody}>
      <div />
      <button type="button" onClick={setShowProfileHandler}>Show profile</button>
      <button type="button" onClick={() => showThreadHandler(postMock)}>Show thread</button>
    </div>
  );
};

export default ChatBody;
