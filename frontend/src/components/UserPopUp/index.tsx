import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { IUser } from '../../common/models/user';
import { PopUpPosition } from '../../common/enums/ComponentProps';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface IProps {
  user: IUser;
  trigger: () => React.ReactElement;
  id: string;
  placement: PopUpPosition;
}

const UserPopUp: FunctionComponent<IProps> = ({ user, trigger, id, placement }) => {
  const popOver = (
    <Popover id={id}>
      <Image className={styles.userAvatarBig} src={user.imgUrl} alt="User avatar big" thumbnail />

      <Popover.Content>
        <p className={styles.usernameHeader}>{user.fullname}</p>
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

export default UserPopUp;
