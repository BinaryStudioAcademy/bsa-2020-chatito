import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from 'components/UserLogo';
import UserPopUp from 'components/UserPopUp';
import SearchInput from 'components/SearchInput';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from 'common/models/user/IUser';
import { IAppState } from 'common/models/store';
import EditProfile from 'containers/EditProfileModal';
import Preferences from 'containers/PreferencesModal';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ReactComponent as Logo } from 'img/logo-icon.svg';
import { Link } from 'react-router-dom';

interface IProps {
  user?: IUser;
  showModal: ({ modalType, show }: IModalRoutine) => void;
  activeWorkspace: string;
}

// eslint-disable-next-line
const Header: FunctionComponent<IProps> = ({ user, activeWorkspace, showModal }) => {
  const toggleButtonClick = () => {
    // @todo decide which button to trigger
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
    showModal({ modalType: ModalTypes.EditProfile, show: true });
  };

  if (!user) {
    return null;
  }

  return (
    <header className={styles.headerContainer}>
      <Link className={styles.logoWrapper} to={activeWorkspace ? `/w/${activeWorkspace}` : '/'}>
        <div className={styles.logoImageWrapper}>
          <Logo className={styles.logoImg} />
        </div>
        <h1 className={styles.logoText}>Chatito</h1>
      </Link>

      <div className={styles.rightAlignContainer}>
        <SearchInput
          onSearch={t => {
            // eslint-disable-next-line
            console.log('Search for ', t)
          }}
          stylesClassName={styles.searchInput}
        />

        <div className={styles.userLogoWrapper}>
          <UserAvatar imgUrl={user.imageUrl || ''} isOnline />

          <UserPopUp
            trigger={getPopUpTrigger}
            id="mainHeaderPopUp"
            placement="bottom"
            onEditProfileClick={showEditModal}
          />
        </div>
        <EditProfile />
        <Preferences />
      </div>
    </header>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user.user,
  activeWorkspace: state.workspace.workspace.hash
});

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
