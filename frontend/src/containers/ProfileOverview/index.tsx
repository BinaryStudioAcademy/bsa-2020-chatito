import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEdit, faEllipsisH, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'common/models/user/IUser';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { useKey } from 'common/hooks/onInputSubmit';
import { addPostRoutine, createChatAndAddPostRoutine } from 'scenes/Chat/routines';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ChatType } from 'common/enums/ChatType';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICreateChatAndAddPost } from 'common/models/chat/ICreateChatAndAddPost';
import { showModalRoutine } from 'routines/modal';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import { faTimesCircle, faSmileWink } from '@fortawesome/free-regular-svg-icons';
import { getUserById } from 'services/userService';
import LoaderWrapper from 'components/LoaderWrapper';

interface IProps {
  tempUser: IUser;
  currentUser: IUser;
  directMessages: IChat[];
  workspaceName: string;
  workspaceHash: string;
  hideRightMenu: IBindingAction;
  addPost: IBindingCallback1<ICreatePost>;
  createChatAndAddPost: IBindingCallback1<ICreateChatAndAddPost>;
  router: (route: string) => void;
  showModal: IBindingCallback1<IModalRoutine>;
}

const ProfileOverview: React.FC<IProps> = ({ tempUser, currentUser, directMessages, workspaceName,
  workspaceHash, hideRightMenu, addPost, createChatAndAddPost, router, showModal }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUsers] = useState<IUser>(tempUser);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserById(tempUser.id).then(fetchedUser => {
      setUsers(fetchedUser);
      setLoading(false);
    });
  }, [tempUser, currentUser]);
  const inputRef = useRef(null);
  const onClose = () => {
    hideRightMenu();
  };

  const onSend = () => {
    if (!message.trim()) return;

    const chat = user.id === currentUser.id
      ? directMessages.find(directMessage => directMessage.users.length === 1)
      : directMessages.find(directMessage => (
        directMessage.users.length === 2 && directMessage.users.find(directUser => directUser.id === user.id)
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
        users: user.id === currentUser.id ? [] : [user]
      };
      createChatAndAddPost({ chat: newChat, text: message });
    }

    hideRightMenu();
  };

  useKey({ key: 'enter', callback: onSend, ref: inputRef });

  const onEdit = () => {
    showModal({ modalType: ModalTypes.EditProfile, show: true });
  };

  const onSetStatus = () => {
    showModal({ modalType: ModalTypes.ChangeStatus, show: true });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const renderAbout = () => (
    <>
      <div className={styles.aboutItem}>
        <div className={styles.label}>Display name</div>
        <div className={styles.displayName}>{user.displayName}</div>
      </div>
      <div className={styles.aboutItem}>
        <div className={styles.label}>Email adress</div>
        <a className={styles.email} href={`mailto: ${user.email}`} target="_blank" rel="noopener noreferrer">
          {user.email}
        </a>
      </div>
    </>
  );
  const imageUrl = user.id === currentUser.id ? currentUser.imageUrl : user.imageUrl;
  return (
    <div className={styles.profileOverview}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faTimesCircle} onClick={onClose} className={styles.closeBtn} />
      </div>
      <LoaderWrapper loading={loading}>
        <div className={styles.avatar}>
          <Image src={imageUrl || userLogoDefaultUrl} alt="avatar" roundedCircle />
        </div>
        <div className={styles.nameWrp}>
          <i className={styles.online} />
          <span className={styles.fullName}>{user.fullName}</span>
        </div>
        {user.title && <div className={styles.title}>{user.title}</div>}
        {user.status && <div className={styles.status}>{user.status}</div>}

        <InputGroup className={styles.inputWrp}>
          <FormControl ref={inputRef} placeholder="Write a message" value={message} onChange={onChange} />
          <InputGroup.Append>
            <button type="button" className="button-unstyled" onClick={onSend}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </InputGroup.Append>
        </InputGroup>

        <div className={styles.toolbar}>
          {user.id === currentUser.id && (
            <button type="button" className="button-unstyled" onClick={onSetStatus}>
              <FontAwesomeIcon icon={faSmileWink} />
            </button>
          )}
          {user.id === currentUser.id && (
          <button type="button" className="button-unstyled" onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          )}
          <button type="button" className="button-unstyled">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>

        <button
          className={`${styles.aboutBtn} button-unstyled`}
          type="button"
          onClick={() => setShowAbout(!showAbout)}
        >
          <div>About</div>
          <FontAwesomeIcon icon={showAbout ? faChevronUp : faChevronDown} />
        </button>
        {showAbout && renderAbout()}
      </LoaderWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOverview);
