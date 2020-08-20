import React, { FunctionComponent, useState, useRef } from 'react';
import { OverlayTrigger, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { useKey } from 'common/hooks/onInputSubmit';
import { userLogoDefaultUrl } from 'common/configs/defaults';

interface IProps {
  user: IUser;
  onSend: () => void;
  openProfile: IBindingCallback1<IUser>;
}

const ProfilePreview: FunctionComponent<IProps> = ({ user, onSend, openProfile }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const onViewProfile = () => {
    openProfile(user);
    document.body.click();
  };
  const onSendMessage = () => {
    if (text.trim()) {
      onSend();
      setText('');
    }
  };
  useKey({ key: 'enter', callback: onSendMessage, ref: inputRef });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
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
            // onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => keycheck(e)}
            ref={inputRef}
            className={styles.textField}
            type="text"
            value={text}
            onChange={onChange}
          />
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButton_reset}`}
            onClick={() => onSendMessage()}
          // need to realise logic to go to the chat with user
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
export default ProfilePreview;
