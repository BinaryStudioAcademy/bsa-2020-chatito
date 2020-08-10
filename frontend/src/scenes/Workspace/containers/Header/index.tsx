import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import UserAvatar from 'components/UserLogo';
import UserPopUp from 'components/UserPopUp';
import SearchInput from 'components/SearchInput';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { IUserState } from '../../../../reducers/user';
import { IAppState } from '../../../../common/models/store';
import EditProfile from '../../../../containers/EditProfile';
import { showModalRoutine } from '../../../../routines/modal';
import { ModalTypes } from '../../../../common/enums/ModalTypes';
import { IModalRoutine } from '../../../../common/models/modal/IShowModalRoutine';
import Logout from '../../../../components/Logout';
=======
import { IUser } from 'common/models/user/IUser';
import { IAppState } from 'common/models/store';
import EditProfile from 'containers/EditProfile';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
>>>>>>> 0ed2ea1e5d972c70e099039cef91a16da8557d81

interface IProps {
  user?: IUser;
  showModal: ({ modalType, show }: IModalRoutine) => void;
}

// eslint-disable-next-line
const Header: FunctionComponent<IProps> = ({ user, showModal }) => {
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
    showModalRoutine({ modalType: ModalTypes.EditProfile, show: true });
  };

  if (!user) {
    return null;
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoWrapper}>
        <img className={styles.logoImg} src="./logo.svg" alt="logo" />
        <h1 className={styles.logoText}>Chatito</h1>
      </div>

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
            user={user}
            trigger={getPopUpTrigger}
            id="mainHeaderPopUp"
            placement="bottom"
            onEditProfileClick={showEditModal}
          />
        </div>
        <Logout />
        <EditProfile />
      </div>
    </header>
  );
};

const mapStateToProps = (state: IAppState) => ({ user: state.user.user });

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
