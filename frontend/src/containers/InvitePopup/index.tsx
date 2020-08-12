import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';

import { IAppState } from 'common/models/store';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ISendInviteLink } from 'common/models/inviteLink/ISendInviteLink';
import { showModalRoutine } from 'routines/modal';
import { sendInviteLinkRoutine } from './routines';

import { ModalTypes } from 'common/enums/ModalTypes';
import ModalWindow from 'components/ModalWindow';

import InputField from 'components/InputField/InputField';
import { inviteLinkSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  isShown: boolean;
  workspace: IWorkspace;
  sendInviteLink: IBindingCallback1<ISendInviteLink>;
  showModal: IBindingCallback1<IModalRoutine>;
}

const InvitePopup = ({ isShown, workspace, sendInviteLink, showModal }: IProps) => {
  const handleCloseModal = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: false });
  };

  const onSubmit = (values: ISendInviteLink) => {
    sendInviteLink({
      email: values.email,
      workspaceId: workspace.id
    });
  };

  const initialValues = {
    email: '',
    workspaceId: workspace.id
  };

  const modalHeader = (
    <h4>
      <span>Invite to </span>
      {workspace.name}
    </h4>
  );

  const modalBody = (
    <InputField label="To:" name="email" type="email" placeholder="Enter email" />
  );

  const modalFooter = (
    <div className={styles.modalFooter}>
      <div className={styles.inviteLinkBlock}>
        <FontAwesomeIcon icon={faLink} className={styles.copyLinkIcon} />
        <span>Copy invite link</span>
      </div>

      <Button type="submit" variant="secondary">
        Send
      </Button>
    </div>
  );

  return (
    <ModalWindow isShown={isShown} onHide={handleCloseModal}>
      {modalHeader}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styles.modalBody}>
          {modalBody}
          {modalFooter}
        </Form>
      </Formik>
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.invitePopup,
  workspace: state.workspace.workspace
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  sendInviteLink: sendInviteLinkRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitePopup);
