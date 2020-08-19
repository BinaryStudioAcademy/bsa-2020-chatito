import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { blockPosition } from '../../common/types/types';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { getRefreshToken } from '../../common/helpers/storageHelper';
import { removeToken } from '../../services/authService';
import { Routes } from 'common/enums/Routes';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';

interface IProps {
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
  onEditProfileClick: () => void;
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
}

const UserPopUp: FunctionComponent<IProps> = ({ trigger, id, placement, onEditProfileClick, showModal, router }) => {
  const onSingOut = () => {
    removeToken(getRefreshToken());
    localStorage.clear();
    window.location.href = Routes.SignIn;
  };

  const showInvitePopup = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: true });
  };

  const onAddWorkspaceClick = () => {
    router(Routes.AddWorkspace);
  };

  const popOver = (
    <Popover id={id} className={styles.panepPopUp}>
      <a href="#0" className={styles.panelSelect}>
        Preferenses
      </a>
      <a href="#0" className={styles.panelSelect} onClick={onEditProfileClick}>
        View Profile
      </a>
      <a href="#0" className={styles.panelSelect} onClick={showInvitePopup}>
        Invite People
      </a>
      <a href="#0" className={styles.panelSelect} onClick={onAddWorkspaceClick}>
        Add workspace
      </a>
      <a href="#0" className={styles.panelSelect} onClick={onSingOut}>
        Sign Out
      </a>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement={placement} overlay={popOver}>
      {trigger()}
    </OverlayTrigger>
  );
};

const mapDispatchToProps = {
  showModal: showModalRoutine,
  router: push
};

export default connect(null, mapDispatchToProps)(UserPopUp);
