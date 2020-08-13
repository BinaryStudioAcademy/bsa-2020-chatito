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
      id: '1',
      email: 'string',
      fullName: 'Test Fullname',
      displayName: 'string',
      imageUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
      title: 'string',
      status: 'online'
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
