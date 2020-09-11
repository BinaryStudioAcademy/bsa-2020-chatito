import React from 'react';
import styles from './styles.module.sass';
import { faHouseUser, faBullhorn, faCode, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoChatReminder = () => (
  <div className={styles.chatContainerMessage}>
    <div className={styles.wrapper}>
      <header className={styles.header}>
        Welcome to your workspace!
      </header>
      <span className={`${styles.paragh} ${styles.text}`}>

        <div className={styles.headerWrapper}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faHouseUser} />
          </div>
          <p className={`${styles.paragh} ${styles.direction}`}>
            Workspace is an isolated area
          </p>
        </div>
        <p className={styles.marginLeft}>
          Each workspace has it`s own users and channels.
          Create a separate workspace for your projects to simplify the management of your business.
        </p>
        <br />

        <div className={styles.headerWrapper}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faBullhorn} />
          </div>
          <p className={`${styles.paragh} ${styles.direction}`}>
            Communicate with your team in different ways
          </p>
        </div>
        <p className={styles.marginLeft}>
          Here you can create public and private channels, write to each other via direct messages,
          comment any message in threads and leave emoji reactions.
        </p>
        <br />

        <div className={styles.headerWrapper}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCode} />
          </div>
          <p className={`${styles.paragh} ${styles.direction}`}>
            Try out text editing abilities
          </p>
        </div>

        <p className={styles.marginLeft}>
          Our users can write messages using the powerful TinyMCE text editor.
          It allows you to use a lot of text formatting instruments. What is more,
          we support using of some simple HTML tags like
          <strong>{' <p>,'}</strong>
          <strong>{' <bold>,'}</strong>
          <strong>{' <italic> '}</strong>
          and others.
        </p>
        <br />

        <div className={styles.headerWrapper}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faTools} />
          </div>
          <p className={`${styles.paragh} ${styles.direction}`}>
            Use a great number of our tools and features
          </p>
        </div>

        <p className={styles.marginLeft}>
          We provide a lot of useful tools for you, which are easy to understand.
          You can use integrations with such services as GitHub, Schedulia and Whale.
        </p>

      </span>
      <br />
      <p className={`${styles.paragh} ${styles.direction}`}>
        To start working, just create a new chat, invite your friends and enjoy yourself!
      </p>
      {/* <p className={`${styles.paragh} ${styles.direction}`}>
        Kind regards,
        <br />
        Chatito team
      </p> */}
    </div>
  </div>
);

export default NoChatReminder;
