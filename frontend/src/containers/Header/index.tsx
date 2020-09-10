import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from 'components/UserLogo';
import UserPopUp from 'containers/UserPopUp';
import SearchInput from 'components/SearchInput';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from 'common/models/user/IUser';
import { IAppState } from 'common/models/store';
import EditProfile from 'containers/EditProfileModal';
import Preferences from 'containers/PreferencesModal';
import { ReactComponent as Logo } from 'img/logo-icon.svg';
import { Link } from 'react-router-dom';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { showUserProfileRoutine } from 'scenes/Workspace/routines';
import { unselectChannelRoutine } from 'scenes/Chat/routines';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  user?: IUser;
  activeWorkspace: string;
  showUserProfile: IBindingCallback1<IUser>;
  unselectChannel: IBindingAction;
}

const Header: FunctionComponent<IProps> = ({ user, activeWorkspace, showUserProfile, unselectChannel }) => {
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
      <span className={styles.profileText}>{user ? user.displayName : 'Profile'}</span>
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  );

  if (!user) {
    return null;
  }

  return (
    <header className={styles.headerContainer}>
      <Link
        className={styles.logoWrapper}
        to={activeWorkspace ? `/w/${activeWorkspace}` : '/'}
        onClick={unselectChannel}
      >
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
            viewProfileClick={showUserProfile}
            user={user}
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
  showUserProfile: showUserProfileRoutine,
  unselectChannel: unselectChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
