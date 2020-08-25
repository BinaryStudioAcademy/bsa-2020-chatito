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
import InviteChatModal from 'scenes/Chat/containers/InviteChatModal';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import ChatMembers from 'containers/ChatMembers';
import { ChatType } from 'common/enums/ChatType';

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
    const usersToDisplay = users.slice(0, maxAvatarsDisplayed);
    return usersToDisplay.map(user => (
      <Image
        src={user.imageUrl || userLogoDefaultUrl}
        key={user.id}
        rounded
        className={styles.memberAvatarIcon}
      />
    ));
  };

  const onInviteUser = () => {
    showModal({ modalType: ModalTypes.InviteChat, show: true });
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
      </div>

      <div className={styles.rightHeaderBlock}>
        {chat.type === ChatType.Channel && (
          <>
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

            <button type="button" className="button-unstyled" onClick={onInviteUser}>
              <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
            </button>
            <InviteChatModal chatName={chat.name} chatId={chat.id} toggleModal={showModal} chatUsers={chat.users} />
            <ChatMembers />
          </>
        )}
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return {
    chat
  };
};

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
