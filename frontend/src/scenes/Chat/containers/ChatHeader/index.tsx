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
import { fetchWorkspaceUsersRoutine } from 'scenes/Workspace/routines';

const privateChannelIcon = (
  <FontAwesomeIcon icon={faLock} className={styles.iconChatType} />
);

interface IProps {
  chat?: IChat;
  showModal: IBindingCallback1<IModalRoutine>;
  workspaceId: string;
  fetchWorkspaceUsers: (workspaceId: string) => void;
}

const ChatHeader: React.FC<IProps> = ({ chat, showModal, workspaceId, fetchWorkspaceUsers }) => {
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

  const onInviteUser = () => {
    fetchWorkspaceUsers(workspaceId);
    showModal({ modalType: ModalTypes.InviteChat, show: true });
  };

  if (!chat) {
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

        <button type="button" className="button-unstyled" onClick={onInviteUser}>
          <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
        </button>
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />

        <InviteChatModal chatName={chat.name} chatId={chat.id} toggleModal={showModal} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return {
    chat,
    workspaceId: state.workspace.workspace.id
  };
};

const mapDispatchToProps = {
  showModal: showModalRoutine,
  fetchWorkspaceUsers: fetchWorkspaceUsersRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
