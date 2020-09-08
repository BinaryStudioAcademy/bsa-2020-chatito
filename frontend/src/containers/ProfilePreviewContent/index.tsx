import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { useKey } from 'common/hooks/onInputSubmit';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { ICreateChatAndAddPost } from 'common/models/chat/ICreateChatAndAddPost';
import { Routes } from 'common/enums/Routes';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { addPostRoutine, createChatAndAddPostRoutine } from 'scenes/Chat/routines';
import { push } from 'connected-react-router';
import { ChatType } from 'common/enums/ChatType';
import { showModalRoutine } from 'routines/modal';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { getUserById } from 'services/userService';

interface IProps {
  tempUser: IUser;
  currentUser: IUser;
  directMessages: IChat[];
  workspaceName: string;
  workspaceHash: string;
  openProfile: IBindingCallback1<IUser>;
  addPost: IBindingCallback1<ICreatePost>;
  createChatAndAddPost: IBindingCallback1<ICreateChatAndAddPost>;
  router: (route: string) => void;
  showModal: ({ modalType, show }: IModalRoutine) => void;
}

const ProfilePreviewContent: FunctionComponent<IProps> = ({ tempUser, currentUser, directMessages, workspaceName,
  workspaceHash, addPost, createChatAndAddPost, router, openProfile, showModal }) => {
  const [user, setUsers] = useState<IUser>(tempUser);
  useEffect(() => {
    getUserById(tempUser.id).then(fetchedUser => {
      setUsers(fetchedUser);
    });
  }, []);

  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const onViewProfile = () => {
    openProfile(user);
    document.body.click();
  };
  const showChangeStatusModal = () => {
    showModal({ modalType: ModalTypes.ChangeStatus, show: true });
  };
  const buttonClick = (callback: IBindingAction) => {
    callback();
    document.body.click();
  };
  const onSend = () => {
    if (!message.trim()) return;

    const chat = user.id === currentUser.id
      ? directMessages.find(directMessage => directMessage.users.length === 1)
      : directMessages.find(directMessage => (
        directMessage.users.length === 2 && directMessage.users.find(directUser => directUser.id === user.id)
      ));

    if (chat) {
      router(Routes.Chat.replace(':whash', workspaceHash).replace(':chash', chat.hash));
      addPost({ chatId: chat.id, text: message });
    } else {
      const newChat: ICreateChat = {
        name: `${currentUser.displayName}, ${user.displayName}`,
        isPrivate: true,
        type: ChatType.DirectMessage,
        workspaceName,
        users: user.id === currentUser.id ? [] : [user]
      };
      createChatAndAddPost({ chat: newChat, text: message });
    }
  };
  useKey({ key: 'enter', callback: onSend, ref: inputRef });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };
  const imageUrl = user.id === currentUser.id ? currentUser.imageUrl : user.imageUrl;
  return (
    <div className={styles.profilePreviewContainer}>
      <div className={styles.contentBody}>
        <div
          className={styles.infoContainer}
        >
          <p className={`${styles.fullname} ${styles.online}`}>{user.fullName}</p>
          {user.title && <p className={styles.title}>{user.title}</p>}
          {user.id === currentUser.id ? (
            <div
              className={styles.statusContainer}
            >
              <span className={styles.userStatus}>{currentUser.status}</span>
            </div>
          ) : (
            <div
              className={styles.statusContainer}
            >
              <span className={styles.userStatus}>{user.status}</span>
            </div>
          )}
          <div className={styles.buttonsBlock}>
            <button
              type="button"
              onClick={onViewProfile}
              className={styles.link}
            >
              View full profile
            </button>
            {user.id === currentUser.id ? (
              <button
                type="button"
                onClick={() => { buttonClick(showChangeStatusModal); }}
                className={`${styles.link} ${styles.setStatus}`}
              >
                Set a status
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <Image
          src={imageUrl || userLogoDefaultUrl}
          width={80}
          height={80}
          className={styles.avatar}
          alt="User avatar"
          roundedCircle
        />
      </div>
      <div className={styles.line} />
      <Form.Group
        className={styles.sendMessageBlock}
      >
        <Form.Control
          ref={inputRef}
          className={styles.textField}
          type="text"
          value={message}
          onChange={onChange}
        />
        <button
          type="button"
          className={`${styles.arrowButton} ${styles.arrowButton_reset}`}
          onClick={onSend}
        >
          <FontAwesomeIcon
            className={styles.arrowIcon}
            icon={faPlay}
          />
        </button>
      </Form.Group>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  directMessages: state.workspace.directMessages,
  workspaceName: state.workspace.workspace.name,
  workspaceHash: state.workspace.workspace.hash,
  currentUser: state.user.user as IUser
});

const mapDispatchToProps = {
  addPost: addPostRoutine,
  createChatAndAddPost: createChatAndAddPostRoutine,
  router: push,
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePreviewContent);
