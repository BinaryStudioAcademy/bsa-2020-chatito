import React from 'react';
import styles from './styles.module.sass';

import ChatHeader from '../ChatHeader';
import ChatBody from '../ChatBody';
import ChatFooter from '../ChatFooter';

const ChatContainer = () => (
  <div className={styles.chat__container}>
    <ChatHeader />
    <ChatBody />
    <ChatFooter />
  </div>
);

export default ChatContainer;
