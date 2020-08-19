import React from 'react';
import styles from './styles.module.sass';

const NoChatReminder = () => (
  <div className={styles.chatContainerMessage}>
    <div className={styles.wrapper}>
      <header className={styles.header}>
        Welcome to your workspace!
      </header>
      <p className={styles.paragh}>
        Here you can lorem ipsum dolor sit amet,
        consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
      </p>

      <p className={styles.paragh}>
        To start working, select one of existing chats or create new one
      </p>
    </div>
  </div>
);

export default NoChatReminder;
