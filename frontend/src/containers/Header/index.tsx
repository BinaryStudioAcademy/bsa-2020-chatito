import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from '../../components/UserLogo';
import UserPopUp from '../../components/UserPopUp';
import SearchInput from '../../components/SearchInput';
import { IAppState } from '../../common/models/store';
import logo from '../../img/ChatitoTemp.png';
import EditProfile from '../EditProfile';
import { showModalRoutine } from '../../routines/modal';
import { ModalTypes } from '../../common/enums/ModalTypes';
import { IModalRoutine } from '../../common/models/modal/IShowModalRoutine';
import { IUserState } from '../../common/models/user/IUserState';

interface IProps {
  user: IUserState;
  showModal: ({ modalType, show }: IModalRoutine) => void;
}

const Header: FunctionComponent<IProps> = ({ user, showModal }) => {
  const toggleButtonClick = () => {
    // @todo decide which button to trigger
  };

  const testUser = {
    imgUrl:
      'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg' // eslint-disable-line max-len
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

  const showEditModal = () => {
    showModalRoutine({ modalType: ModalTypes.EditProfile, show: true });
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainLogo}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>

      <SearchInput
        onSearch={t => console.log('Search for ', t)}
        stylesClassName={styles.searchInput}
      />

      {user.isAuthorized ? (
        <UserPopUp
          user={user}
          trigger={getAvatar}
          id="mainHeaderPopUp"
          placement="bottom"
          // onEditProfileClick={showEditModal}
        />
      ) : (
        <div>You need to sign in</div>
      )}
      <EditProfile />
    </header>
  );
};

const mapStateToProps = (state: IAppState) => ({ user: state.user });

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
