import styles from './styles.module.sass';
import React, { FunctionComponent, useState } from 'react';
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
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  trigger: () => React.ReactElement;
  id: string;
  placement: blockPosition;
  onEditProfileClick: () => void;
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
}

const UserPopUp: FunctionComponent<IProps> = ({ trigger, id, placement, onEditProfileClick, showModal, router }) => {
  const [show, setShow] = useState<boolean | undefined>(undefined);
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
  const buttonClick = (callback: IBindingAction) => {
    setShow(false);
    callback();
    setTimeout(() => {
      setShow(undefined);
    }, 0);
  };
  const popOver = (
    <Popover id={id} className={styles.panelPopUp}>
      <button type="button" className={styles.panelSelect}>
        Preferences
      </button>
      <button type="button" className={styles.panelSelect} onClick={() => { buttonClick(onEditProfileClick); }}>
        View Profile
      </button>
      <button type="button" className={styles.panelSelect} onClick={() => { buttonClick(showInvitePopup); }}>
        Invite People
      </button>
      <button type="button" className={styles.panelSelect} onClick={() => { buttonClick(onAddWorkspaceClick); }}>
        Add workspace
      </button>
      <button type="button" className={styles.panelSelect} onClick={() => { buttonClick(onSingOut); }}>
        Sign Out
      </button>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose show={show} placement={placement} overlay={popOver}>
      {trigger()}
    </OverlayTrigger>
  );
};

const mapDispatchToProps = {
  showModal: showModalRoutine,
  router: push
};

export default connect(null, mapDispatchToProps)(UserPopUp);
