import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { blockPosition } from '../../common/types/types';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { getRefreshToken } from '../../common/helpers/storageHelper';
import { removeToken } from '../../services/authService';
import { Routes } from 'common/enums/Routes';

interface IProps {
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
  onEditProfileClick: () => void;
}

const UserPopUp: FunctionComponent<IProps> = ({ trigger, id, placement, onEditProfileClick }) => {
  const onSingOut = () => {
    removeToken(getRefreshToken());
    localStorage.clear();
    window.location.href = Routes.SignIn;
  };

  const popOver = (
    <Popover id={id} className={styles.panepPopUp}>
      <a href="#0" className={styles.panelSelect}>
        <span className={styles.panelText}>Preferenses</span>
      </a>
      <a href="#0" className={styles.panelSelect} onClick={onEditProfileClick}>
        <span className={styles.panelText}>View Profile</span>
      </a>
      <a href="#0" className={styles.panelSelect}>
        <span className={styles.panelText}>Invite People</span>
      </a>
      <a href="#0" className={styles.panelSelect}>
        <span className={styles.panelText}>Add workspace</span>
      </a>
      <a href="#0" className={styles.panelSelect}>
        <span className={styles.panelText}>Switch workspace</span>
      </a>
      <a href="#0" className={styles.panelSelect} onClick={onSingOut}>
        <span className={styles.panelText}>Sign Out</span>
      </a>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement={placement} overlay={popOver}>
      {trigger()}
    </OverlayTrigger>
  );
};

export default UserPopUp;
