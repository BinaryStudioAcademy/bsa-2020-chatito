import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { IUser } from '../../common/models/user/IUser';
import { blockPosition } from '../../common/types/types';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

interface IProps {
  user: IUser;
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
  onEditProfileClick: () => void;
}

const UserPopUp: FunctionComponent<IProps> = ({ user, trigger, id, placement, onEditProfileClick }) => {
  const popOver = (
    <Popover id={id}>
      <Image className={styles.userAvatarBig} src={user.imageUrl || ''} alt="User avatar big" thumbnail />

      <Popover.Content>
        <p className={styles.usernameHeader}>{user.fullName}</p>
        <p>Some info</p>
        <p>Some othe info</p>
        <Button variant="primary" onClick={onEditProfileClick}>Edit profile</Button>
      </Popover.Content>

    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement={placement} overlay={popOver}>
      {trigger()}
    </OverlayTrigger>
  );
};

export default UserPopUp;
