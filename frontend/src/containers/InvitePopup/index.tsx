import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';

import { IAppState } from '../../common/models/store';
import { IBindingCallback1 } from '../../common/models/callback';
import { IModalRoutine } from '../../common/models/modal/IShowModalRoutine';
import { showModalRoutine } from '../../routines/modal';
import { ModalTypes } from '../../common/enums/ModalTypes';
import ModalWindow from '../../components/ModalWindow';

interface IProps {
  isShown: boolean;
  // sendInviteLink: IBindingCallback1<ISendInviteLink>;
  showModal: IBindingCallback1<IModalRoutine>;
}

const InvitePopup = ({ isShown, showModal }: IProps) => {
  const [inviteEmail, setInviteEmail] = useState<string>('');

  const isEmailEmpty = () => !inviteEmail.length;

  const handleCloseModal = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: false });
  };

  const modalHeader = (
    <h4>Invite to Chatito</h4>
  );

  const modalBody = (
    <Form className={styles.modalBody}>
      <Form.Group>
        <Form.Label>To:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
    </Form>
  );

  const modalFooter = (
    <div className={styles.modalFooter}>
      <div className={styles.inviteLinkBlock}>
        <FontAwesomeIcon icon={faLink} className={styles.copyLinkIcon} />
        <span>Copy invite link</span>
      </div>

      <Button
        disabled={isEmailEmpty()}
        variant="secondary"
        // onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );

  return (
    <ModalWindow isShown={isShown} onHide={handleCloseModal}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.invitePopup
});

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitePopup);
