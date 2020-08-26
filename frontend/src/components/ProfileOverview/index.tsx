import React, { useState } from 'react';
import styles from './styles.module.sass';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faEllipsisH, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { IUser } from 'common/models/user/IUser';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  user: IUser;
  currentUserId: string;
  hideRightMenu: IBindingAction;
}

const ProfileOverview: React.FC<IProps> = ({ user, currentUserId, hideRightMenu }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [message, setMessage] = useState('');

  const isOnline = true; // mock data
  const imgUrl = 'https://cdn.boldomatic.com/resource/web/v2/images/profile-dummy-2x.png?width=34&height=34&format=jpg&quality=90'; // eslint-disable-line max-len

  const onClose = () => {
    hideRightMenu();
  };

  const onSend = () => {
    // if (!message.trim()) return;

    // send message

    hideRightMenu();
  };

  const onEdit = () => {
    // show edit modal
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
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

  return (
    <div className={styles.profileOverview}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faTimesCircle} onClick={onClose} className={styles.closeBtn} />
      </div>

      <div className={styles.avatar}>
        <Image src={user.imageUrl || imgUrl} alt="avatar" roundedCircle />
      </div>
      <div className={styles.nameWrp}>
        <i className={isOnline ? styles.online : styles.offline} />
        <span className={styles.fullName}>{user.fullName}</span>
      </div>
      {user.title && <div className={styles.title}>{user.title}</div>}
      {user.status && <div className={styles.status}>{user.status}</div>}

      <InputGroup className={styles.inputWrp}>
        <FormControl
          placeholder="Write a message"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Append>
          <button
            type="button"
            className="button-unstyled"
            onClick={onSend}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </InputGroup.Append>
      </InputGroup>

      <div className={styles.toolbar}>
        {user.id === currentUserId && (
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
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {showAbout && renderAbout()}
    </div>
  );
};

export default ProfileOverview;
