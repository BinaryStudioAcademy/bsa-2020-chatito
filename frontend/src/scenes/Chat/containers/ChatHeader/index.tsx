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
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import ChatMembers from 'containers/ChatMembers';

const privateChannelIcon = (
  <FontAwesomeIcon icon={faLock} className={styles.iconChatType} />
);

interface IProps {
  chat?: IChat;
  showModal: IBindingCallback1<IModalRoutine>;
}

const ChatHeader: React.FC<IProps> = ({ chat, showModal }) => {
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

    return initVal.map(url => (<Image src={url} key={url} rounded className={styles.memberAvatarIcon} />));
  };

  if (!chat) {
    return null;
  }

  const showChatMembers = () => {
    showModal({ modalType: ModalTypes.ChatMembers, show: true });
  };

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
        <div
          role="button"
          className={styles.memberAvatarBlock}
          onClick={showChatMembers}
          onKeyDown={showChatMembers}
          tabIndex={0}
        >
          {userAvatars(chat.users)}
          <div className={styles.memberCounter}>{chat.users.length || 0}</div>
        </div>

        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      </div>
      <ChatMembers />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return { chat };
};

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
