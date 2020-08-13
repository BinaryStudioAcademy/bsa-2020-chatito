import React from 'react';
import styles from './styles.module.sass';

import {
  faLock,
  faStar,
  faUserPlus,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'react-bootstrap/Image';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { IUser } from 'common/models/user/IUser';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import { connect } from 'react-redux';

const privateChannelIcon = (
  <FontAwesomeIcon icon={faLock} className={styles.iconChatType} />
);

interface IProps {
  chat?: IChat;
}

const ChatHeader: React.FC<IProps> = ({ chat }) => {
  console.log('RENDER');
  console.log(chat);

  const maxAvatarsDisplayed = 5;
  const userAvatars = (users: IUser[]) => {
    const initVal: string[] = [];
    users.reduce((prevValue, currUser, currIndex) => {
      if (currIndex >= maxAvatarsDisplayed) {
        return prevValue;
      }
      prevValue.push(currUser.imageUrl || userLogoDefaultUrl);
      return prevValue;
    }, initVal);
    console.log('VATARS');

    console.log(initVal);

    return initVal.map(url => (<Image src={url} key={url} rounded className={styles.memberAvatarIcon} />));
  };

  if (!chat) {
    console.log('RETURN NULL');

    return null;
  }

  return (
    <div className={styles.chatContainer} key={chat.id}>

      <div className={styles.headerInfo}>
        <div className={styles.titleBlock}>
          {chat.isPrivate ? privateChannelIcon : null}
          <div className={styles.title}>{chat.name || ''}</div>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
        </div>

        <div className={styles.topic}>Add topic</div>
      </div>

      <div className={styles.rightHeaderBlock}>
        <div className={styles.memberAvatarBlock}>
          {userAvatars(chat.users)}
          <div className={styles.memberCounter}>{chat.users.length || 0}</div>
        </div>

        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return { chat };
};

export default connect(mapStateToProps, null)(ChatHeader);
