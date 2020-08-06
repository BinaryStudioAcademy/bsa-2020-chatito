import styles from './styles.module.sass';

import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from '../../components/UserLogo';
import UserPopUp from '../../components/UserPopUp';
import SearchInput from '../../components/SearchInput';
import { IAppState } from '../../common/models/store';
import { IUserState } from '../../reducers/user';

interface IProps {
  user: IUserState;
}

const Header: FunctionComponent<IProps> = ({ user }) => {
  const toggleButtonClick = () => {
    // @todo decide which button to trigger
  };

  const testUser = {
    imgUrl: 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg' // eslint-disable-line max-len
  };

  const getAvatar = () => (
    <div
      className={styles.popUpWrapper}
      role="button"
      tabIndex={0}
      onKeyDown={toggleButtonClick}
    >
      <UserAvatar imgUrl={testUser.imgUrl} isOnline />
    </div>
  );

  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainLogo}>Logo</div>

      <SearchInput onSearch={t => console.log('Search for ', t)} stylesClassName={styles.searchInput} />

      {user.isAuthorized
        ? <UserPopUp user={user} trigger={getAvatar} id="mainHeaderPopUp" placement="bottom" />
        : <div>You need to sign in</div>}

    </header>
  );
};

const mapStateToProps = (state: IAppState) => ({ user: state.user });

export default connect(
  mapStateToProps
)(Header);
