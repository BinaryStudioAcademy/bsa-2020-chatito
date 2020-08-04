import styles from './styles.module.scss';
import React from 'react';
import IUser from '../../common/models/user';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const UserPopUp = ({ user, trigger, id, placement }: IPropsType) => {
  const popOver = (
    <Popover id={id}>
      <Image className={styles.userAvatarBig} src={user.imgUrl} alt="User avatar big" thumbnail />

      <Popover.Content>
        <p className={styles.usernameHeader}>{user.name}</p>
        <p>Some info</p>
        <p>Some othe info</p>
      </Popover.Content>

    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement={placement} overlay={popOver}>
      {trigger()}
    </OverlayTrigger>
  );
};

interface IPropsType {
  user: IUser;
  trigger: () => React.ReactElement;
  id: string;
  placement: 'auto-start' | 'auto' |
             'auto-end' | 'top-start'|
             'top' | 'top-end' | 'right-start' |
             'right' | 'right-end' | 'bottom-end' |
             'bottom' | 'bottom-start' |
             'left-end' | 'left' | 'left-start';
}

export default UserPopUp;
