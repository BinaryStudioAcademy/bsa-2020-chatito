import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from 'components/UserLogo';
import UserPopUp from 'components/UserPopUp';
import SearchInput from 'components/SearchInput';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserState } from 'reducers/user';
import { IAppState } from 'common/models/store';
import EditProfile from 'containers/EditProfile';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';

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
      'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg', // eslint-disable-line max-len
    isAuthorized: true
  };

  const getPopUpTrigger = () => (
    <div
      className={`${styles.popUpWrapper} noselect`}
      role="button"
      tabIndex={0}
      onKeyDown={toggleButtonClick}
    >
      <span className={styles.profileText}>Profile</span>
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  );

  const showEditModal = () => {
    showModalRoutine({ modalType: ModalTypes.EditProfile, show: true });
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoWrapper}>
        <img className={styles.logoImg} src="./logo.svg" alt="logo" />
        <h1 className={styles.logoText}>Chatito</h1>
      </div>

      <div className={styles.rightAlignContainer}>
        <SearchInput
          onSearch={t => console.log('Search for ', t)}
          stylesClassName={styles.searchInput}
        />

        <div className={styles.userLogoWrapper}>
          <UserAvatar imgUrl={testUser.imgUrl} isOnline />

          <UserPopUp
            user={user}
            trigger={getPopUpTrigger}
            id="mainHeaderPopUp"
            placement="bottom"
            onEditProfileClick={showEditModal}
          />
        </div>

        <EditProfile />
      </div>
    </header>
  );
};

const mapStateToProps = (state: IAppState) => ({ user: state.user });

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);