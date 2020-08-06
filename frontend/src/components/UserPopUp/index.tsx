import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { IUser } from '../../common/models/user';

import { blockPosition } from '../../common/types/types';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { IUserState } from '../../reducers/user';

interface IProps {
  user: IUserState;
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
}

const UserPopUp: FunctionComponent<IProps> = ({ user, trigger, id, placement }) => {
  const testUser = {
    fullname: 'test fullname',
    imgUrl: 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg' // eslint-disable-line max-len
  };

  const popOver = (
    <Popover id={id}>
      <Image className={styles.userAvatarBig} src={testUser.imgUrl} alt="User avatar big" thumbnail />

      <Popover.Content>
        <p className={styles.usernameHeader}>{testUser.fullname}</p>
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
