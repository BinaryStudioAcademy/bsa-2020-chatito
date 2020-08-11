import React, { FunctionComponent, useState, useContext } from 'react';
import { OverlayTrigger, Button, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';

// const {
//   setShowProfileHandler,
//   setUserDataHandler
// } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars
interface IProps {
  user: IUser;
  onSend: IBindingCallback1<string>;
}

const ProfilePreview: FunctionComponent<IProps> = ({ user, onSend }) => {
  const [text, setText] = useState('');
  // const onViewProfile = () => {
  //   setUserDataHandler(user);
  //   setShowProfileHandler();
  // };
  const onSendMessage = (message: string) => {
    if (text.trim()) {
      onSend(message);
    }
    setText('');
  };
  const keycheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage(text);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  const popOver = (
    <Popover id={user.id} className={styles.popOverWindow}>
      <div className={styles.avatarContainer}>
        <Image className={styles.userAvatar} src={user.imageUrl} alt="User avatar" thumbnail />
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
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => keycheck(e)}
            className={styles.textField}
            type="text"
            value={text}
            onChange={onChange}
          />
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButton_reset}`}
            onClick={() => onSendMessage(text)}
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
