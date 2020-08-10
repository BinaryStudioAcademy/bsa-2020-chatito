import React from 'react';
import styles from './styles.module.sass';

import {
  faLock,
  // faHashtag,
  // faPhone,
  // faCircle,
  faStar,
  faUserPlus,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'react-bootstrap/Image';

const privateChannelIcon = (
  <FontAwesomeIcon icon={faLock} className={styles.iconChatType} />
);

// const publicChannelIcon = (
//   <FontAwesomeIcon icon={faHashtag} className={styles.iconChatType} />
// );

// const directMessageIcon = (
//   <FontAwesomeIcon icon={faCircle} className={`${styles.iconChatType} ${styles.active}`} />
// );

// const callIcon = (
//   <FontAwesomeIcon icon={faPhone} className={styles.icon} />
// );

const ChatHeader = () => {
  const memberAvatar = (
    <Image
      src="https://ca.slack-edge.com/T016ALRN75L-U0188LUR38U-g7678769d661-24"
      rounded
      className={styles.memberAvatarIcon}
    />
  );

  return (
    <div className={styles.chatContainer}>

      <div className={styles.headerInfo}>
        <div className={styles.titleBlock}>
          {privateChannelIcon}
          <div className={styles.title}>chatito</div>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
        </div>

        <div className={styles.topic}>Add topic</div>
      </div>

      <div className={styles.rightHeaderBlock}>
        <div className={styles.memberAvatarBlock}>
          {memberAvatar}
          {memberAvatar}
          {memberAvatar}
          <div className={styles.memberCounter}>17</div>
        </div>

        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      </div>
    </div>
  );
};

export default ChatHeader;
