import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { IUser } from '../../common/models/user';
import { blockPosition } from '../../common/types/types';
import { OverlayTrigger, Button, Image, Popover, Form } from 'react-bootstrap';
import { IUserState } from '../../common/models/user/user';
import { Link } from 'react-router-dom';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  user: IUserState;
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
}

// const ProfilePreview: FunctionComponent<IProps> = ({ user, trigger, id, placement }) => {
const ProfilePreview: FunctionComponent = () => {
  const testUser = {
    imgUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
    fullname: 'Test Fullname',
    whatIDo: 'coding',
    status: 'online',
    myId: '1'
  };

  const popOver = (
    <Popover id="2343fwfsdf" className={styles.popOverWindow}>
      <div className={styles.avatarContainer}>
        <Image className={styles.userAvatar} src={testUser.imgUrl} alt="User avatar" thumbnail />
      </div>
      <Popover.Content>
        <p className={styles.fullname}>{testUser.fullname}</p>
        <p className={styles.whatIDo}>{testUser.whatIDo}</p>
        {testUser.myId === '1' ? (
          <Link to="." className={styles.viewProfile}>View full profile</Link>
        ) : ' '}
        <Form.Group className={styles.sendMessageBlock}>
          <Form.Control className={styles.textField} as="textarea" rows={3} />
          <div className={styles.arrowButton}>
            <FontAwesomeIcon
              className={styles.arrowIcon}
              icon={faLocationArrow}
            />
          </div>
        </Form.Group>
      </Popover.Content>

    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popOver}>
      <Button variant="success">Show</Button>
    </OverlayTrigger>
  );
};
export default ProfilePreview;
