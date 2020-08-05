import styles from './styles.module.sass';
import React from 'react';
import UserAvatar from '../../components/UserLogo';
import UserPopUp from '../../components/UserPopUp';
import { IUser } from '../../common/models/user';

const defaultAvatar = 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg'; // eslint-disable-line max-len
const testUser: IUser = {
  imgUrl: defaultAvatar,
  fullname: 'YareK'
};

const Header = () => {
  const toggleButtonClick = () => {
    // @todo decide which button to trigger
  };

  const getAvatar = () => (
    <div
      className={styles.popUpWrapper}
      role="button"
      tabIndex={0}
      onKeyDown={toggleButtonClick}
    >
      <UserAvatar imgUrl={defaultAvatar} isOnline />
    </div>
  );

  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainLogo}>Logo</div>

      <div>Some components here</div>
      <UserPopUp user={testUser} trigger={getAvatar} id="mainHeaderPopUp" placement="bottom" />

    </header>
  );
};

export default Header;
