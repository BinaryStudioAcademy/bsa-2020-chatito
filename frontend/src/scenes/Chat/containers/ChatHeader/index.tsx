import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';

import {
  faUserPlus,
  faInfoCircle,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import { toggleChatMuteRoutine } from '../../routines';
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
import { createDirectChannelName } from 'common/helpers/nameHelper';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { showUserProfileRoutine } from 'scenes/Workspace/routines';

interface IProps {
  chat?: IChat;
  showModal: IBindingCallback1<IModalRoutine>;
  currentUser: IUser;
  showUserProfile: IBindingCallback1<IUser>;
  directUsers: IUser[] | undefined;
  setMute: (chat: IChat) => {};
  isUserChatMember: boolean;
}

const ChatHeader: React.FC<IProps> = ({ chat, showModal, setMute, currentUser,
  showUserProfile, directUsers, isUserChatMember }) => {
  const [userToShow, setUserToShow] = useState<IUser>(currentUser);
  useEffect(() => {
    if (directUsers && directUsers.length && directUsers.length === 2) {
      directUsers.forEach(user => {
        if (user.id !== currentUser.id) {
          setUserToShow(user);
        }
      });
    }
    if (directUsers && directUsers.length === 1) {
      setUserToShow(directUsers[0]);
    }
  }, [directUsers]);
  const maxAvatarsDisplayed = 5;
  const userAvatars = (users: IUser[]) => {
    const usersToDisplay = users.slice(0, maxAvatarsDisplayed);
    return usersToDisplay.map(user => {
      const imageUrl = user.id === currentUser.id ? currentUser.imageUrl : user.imageUrl;
      return (
        <Image
          src={imageUrl || userLogoDefaultUrl}
          key={user.id}
          rounded
          className={styles.memberAvatarIcon}
        />
      );
    });
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

  const chatName = chat.type === ChatType.DirectMessage
    ? createDirectChannelName(chat.users, currentUser)[0] : chat.name;

  const addPeoplePopover = (
    <Popover id="addPeoplePopover" className={styles.popOverWindow}>
      <span>
        Add people
        <br />
        to the channel
      </span>
    </Popover>
  );

  const viewMembersPopover = (
    <Popover id="viewMembersPopover" className={styles.popOverWindow}>
      <span>
        View all members
      </span>
    </Popover>
  );
  const setChatMute = () => {
    setMute(chat);
  };

  const PopoverItem = (data: string) => (
    <Popover id="workspaceItemPopover" className={styles.popOverWindow}>
      <span>
        {data}
      </span>
    </Popover>
  );

  const chatMuteIcons = () => (chat.isMuted
    ? (
      <OverlayTrigger
        trigger={['hover', 'hover']}
        delay={{ show: 300, hide: 0 }}
        rootClose
        placement="bottom-start"
        overlay={PopoverItem('Unmute chat')}
      >
        <FontAwesomeIcon className={styles.icon} icon={faVolumeMute} onClick={setChatMute} />
      </OverlayTrigger>
    ) : (
      <OverlayTrigger
        trigger={['hover', 'hover']}
        delay={{ show: 300, hide: 0 }}
        rootClose
        placement="bottom-start"
        overlay={PopoverItem('Mute chat')}
      >
        <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} onClick={setChatMute} />
      </OverlayTrigger>
    ));

  return (
    <div className={styles.chatContainer} key={chat.id}>

      <div className={styles.headerInfo}>
        <div className={styles.titleBlock}>
          {chat.type === ChatType.DirectMessage && directUsers && directUsers.length < 3 ? (
            <button
              onClick={() => showUserProfile(userToShow)}
              className="button-unstyled"
              type="button"
            >
              <div className={styles.title}>{userToShow.fullName}</div>
            </button>
          ) : (
            <div className={styles.title}>{chatName}</div>
          )}
          {chat.type === ChatType.Channel
            && (
              <OverlayTrigger
                trigger={['hover', 'hover']}
                delay={{ show: 300, hide: 0 }}
                rootClose
                placement="bottom-start"
                overlay={PopoverItem(chat.description || 'No description for this chat')}
              >
                <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
              </OverlayTrigger>
            )}
          {isUserChatMember && chatMuteIcons()}
        </div>

      </div>

      <div className={styles.rightHeaderBlock}>
        {chat.type === ChatType.Channel && (
          <>
            <OverlayTrigger
              trigger={['hover', 'hover']}
              delay={{ show: 300, hide: 0 }}
              rootClose
              placement="bottom"
              overlay={viewMembersPopover}
            >
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
            </OverlayTrigger>
            {isUserChatMember && (
              <>
                <OverlayTrigger
                  trigger={['hover', 'hover']}
                  delay={{ show: 300, hide: 0 }}
                  rootClose
                  placement="bottom"
                  overlay={addPeoplePopover}
                >
                  <button type="button" className="button-unstyled" onClick={onInviteUser}>
                    <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                  </button>
                </OverlayTrigger>
                <InviteChatModal chatId={chat.id} toggleModal={showModal} chatUsers={chat.users} />
              </>
            )}
            <ChatMembers isUserChatMember={isUserChatMember} />

          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return {
    chat,
    currentUser: state.user.user as IUser,
    directUsers: state.chat.chat?.users
  };
};

const mapDispatchToProps = {
  showUserProfile: showUserProfileRoutine,
  showModal: showModalRoutine,
  setMute: toggleChatMuteRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
