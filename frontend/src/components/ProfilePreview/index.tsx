import React, { FunctionComponent, useState, useContext } from 'react';
import { OverlayTrigger, Button, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { Link, Redirect } from 'react-router-dom';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import ProfileOverview from 'components/ProfileOverview';
import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';

const {
  setShowProfileHandler,
  setUserDataHandler
} = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars
interface IProps {
  user: IUser;
  trigger: () => React.ReactElement;
  id: string;
  onSend: IBindingCallback1<string>;
}

// Mocked data: testData and trigger function
const testData = {
  user: {
    id: '1',
    email: 'string',
    fullName: 'Test Fullname',
    displayName: 'string',
    title: 'string',
    imgUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
    whatIDo: 'coding',
    status: 'online'
  },
  onSend: (message: string) => console.log(message),
  redirectTo: '/profile'
};
const trigger = () => <Button variant="success">Show</Button>;

// const ProfilePreview: FunctionComponent<IProps> = ({ user, trigger, onSend }) => {
const ProfilePreview: FunctionComponent = () => {
  const [text, setText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const onViewProfile = () => {
    setUserDataHandler(testData.user);
    setShowProfileHandler();
  };
  // const renderProfile = () => (
  //   <ProfileOverview
  //     user={testData.user}
  //     currentUserId={testData.user.id}
  //     setShowProfileHandler={setShowProfileHandler}
  //     setUserDataHandler={setUserDataHandler}
  //   />
  // );
  const onSendMessage = (message: string) => {
    if (text.trim()) {
      testData.onSend(message);
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
    <Popover id={testData.user.id} className={styles.popOverWindow}>
      <div className={styles.avatarContainer}>
        <Image className={styles.userAvatar} src={testData.user.imgUrl} alt="User avatar" thumbnail />
      </div>
      <Popover.Content>
        {testData.user.status === 'online' ? (
          <p className={`${styles.fullname} ${styles.online}`}>{testData.user.fullName}</p>
        ) : (
          <p className={`${styles.fullname} ${styles.offline}`}>{testData.user.fullName}</p>
        )}
        <p className={styles.whatIDo}>{testData.user.whatIDo}</p>
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
      {trigger()}
    </OverlayTrigger>
  );
};
export default ProfilePreview;
