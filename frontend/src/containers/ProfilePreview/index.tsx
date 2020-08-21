import React, { FunctionComponent, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { OverlayTrigger, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
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

interface IProps {
  user: IUser;
  currentUser: IUser;
  directMessages: IChat[];
  workspaceName: string;
  workspaceHash: string;
  openProfile: IBindingCallback1<IUser>;
  addPost: IBindingCallback1<ICreatePost>;
  createChatAndAddPost: IBindingCallback1<ICreateChatAndAddPost>;
  router: (route: string) => void;
}

const ProfilePreview: FunctionComponent<IProps> = ({ user, currentUser, directMessages, workspaceName,
  workspaceHash, addPost, createChatAndAddPost, router, openProfile }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const onViewProfile = () => {
    openProfile(user);
    document.body.click();
  };
  const onSend = () => {
    if (!message.trim()) return;

    const chat = user.id === currentUser.id
      ? directMessages.find(directMessage => directMessage.users.length === 1)
      : directMessages.find(directMessage => (
        directMessage.users.find(directUser => directUser.id === user.id)
      ));

    if (chat) {
      addPost({ chatId: chat.id, text: message });
      router(Routes.Chat.replace(':whash', workspaceHash).replace(':chash', chat.hash));
    } else {
      const newChat: ICreateChat = {
        name: `${currentUser.displayName}, ${user.displayName}`,
        isPrivate: true,
        type: ChatType.DirectMessage,
        workspaceName,
        users: user.id === currentUser.id ? [currentUser] : [currentUser, user]
      };
      createChatAndAddPost({ chat: newChat, text: message });
    }
  };
  useKey({ key: 'enter', callback: onSend, ref: inputRef });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };
  const popOver = (
    <Popover id={user.id} className={styles.popOverWindow}>
      <div className={styles.avatarContainer}>
        <Image className={styles.userAvatar} src={user.imageUrl || userLogoDefaultUrl} alt="User avatar" thumbnail />
      </div>
      <Popover.Content>
        {user.status === 'online' ? (
          <p className={`${styles.fullname} ${styles.online}`}>{user.fullName}</p>
        ) : (
          <p className={`${styles.fullname} ${styles.offline}`}>{user.fullName}</p>
        )}
        <p className={styles.title}>{user.title}</p>
        <button
          type="button"
          onClick={onViewProfile}
          className={styles.link}
        >
          View full profile
        </button>
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
              icon={faLocationArrow}
            />
          </button>
        </Form.Group>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popOver}>
      <button
        type="button"
        className={styles.link}
      >
        <Image
          src={user.imageUrl || userLogoDefaultUrl}
          style={{ objectFit: 'cover' }}
          width={40}
          height={40}
          className="mr-3 rounded"
          alt={user.fullName}
          roundedCircle
        />
      </button>
    </OverlayTrigger>
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
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePreview);
