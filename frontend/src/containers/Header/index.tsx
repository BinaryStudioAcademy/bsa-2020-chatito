import styles from './styles.module.scss';
import React, { useState } from 'react';
import UserAvatar from '../../components/UserLogo';
import UserPopUp from '../../components/UserPopUp';
import IUser from '../../common/models/IUser';

const defaultAvatar = 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg'; // eslint-disable-line max-len
const testUser: IUser = {
  imgUrl: defaultAvatar,
  name: 'YareK'
};

const Header = () => {
  const [isPopUp, setPopUp] = useState(false);

  const togglePopUp = () => setPopUp(!isPopUp);

  const toggleButtonClick = () => {
    console.log('Button click');
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainLogo}>Logo</div>

      <div>Some components here</div>

      <div
        className={styles.popUpWrapper}
        role="button"
        tabIndex={0}
        onKeyDown={toggleButtonClick}
        onClick={togglePopUp}
      >
        <UserAvatar imgUrl={defaultAvatar} isOnline />
        <UserPopUp isShown={isPopUp} user={testUser} />
      </div>
    </header>
  );
};

export default Header;
