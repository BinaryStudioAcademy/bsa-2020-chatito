import React from 'react';
import styles from './styles.module.sass';

const NoChatReminder = () => (
  <div className={styles.chatContainerMessage}>
    <div className={styles.wrapper}>
      <header className={styles.header}>
        Welcome to your workspace!
      </header>
      <span className={`${styles.paragh} ${styles.text}`}>
        <p className={`${styles.paragh} ${styles.direction}`}>
          Workspace is an isolated area
        </p>
        <p>
          Each workspace has it`s own users and channels.
          Create separate workspace for your projects so that`ll be easy to manage your busyness.
        </p>

        <p className={`${styles.paragh} ${styles.direction}`}>
          Communicate with your team in different ways
        </p>
        <p>
          Here you can create public and private channels, write each other via direct messages,
          comment any message in threads and leave emoji reactions.
        </p>

        <p className={`${styles.paragh} ${styles.direction}`}>
          Reach text editing abilities
        </p>
        <p>
          Our users can write messages using powerful TinyMCE text editor.
          It allows you to use a lot of text formating instruments. What is more,
          we support using of some simple HTML tags like
          <strong>{' <p>,'}</strong>
          <strong>{' <bold>,'}</strong>
          <strong>{' <italic> '}</strong>
          and others.
        </p>

        <p className={`${styles.paragh} ${styles.direction}`}>
          Use numbers of utilities to make your life easier
        </p>
        <p>
          We provide a lot of useful tools for you, which are easy to understand.
          Moreover, we are integrating services like GitHub and Trello in order to allow you
          not to waste time on following links or swapping browser tabs.
        </p>

      </span>
      <p className={`${styles.paragh} ${styles.direction}`}>
        To start working, create new chat, invite your friends and enjoy yourself!
      </p>
      <p className={`${styles.paragh} ${styles.direction}`}>
        With lot of love,
        <br />
        Chatito team
      </p>
    </div>
  </div>
);

export default NoChatReminder;
