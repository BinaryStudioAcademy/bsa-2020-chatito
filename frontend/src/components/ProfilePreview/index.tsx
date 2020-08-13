import React, { FunctionComponent, useState, useContext, useRef } from 'react';
import { OverlayTrigger, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { useKey } from 'common/hooks/onInputSubmit';
// import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';
import { userLogoDefaultUrl } from 'common/configs/defaults';

// const {
//   setShowProfileHandler,
//   setUserDataHandler
// } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars
interface IProps {
  user: IUser;
  onSend: () => void;
}

const ProfilePreview: FunctionComponent<IProps> = ({ user, onSend }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  // const onViewProfile = () => {
  //   setUserDataHandler(user);
  //   setShowProfileHandler();
  // };
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
        <Image className={styles.userAvatar || userLogoDefaultUrl} src={user.imageUrl} alt="User avatar" thumbnail />
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
          // onClick={onViewProfile}
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
        <img
          width={64}
          height={64}
          className="mr-3 rounded"
          src={user.imageUrl ? user.imageUrl : 'https://my.throtl.com/assets/icons/user-default-gray'}
          alt={user.fullName}
        />
      </button>
    </OverlayTrigger>
  );
};
export default ProfilePreview;
