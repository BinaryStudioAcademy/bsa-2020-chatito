import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
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
    <header className="modalHeader">
      <span>Invite to </span>
      {workspace.name}
    </header>
  );

  const modalBody = (
    <div className="modalBody">
      <InputField label="To:" name="email" type="email" placeholder="Enter email" />
    </div>
  );

  const modalFooter = (
    <div className="buttonsContainer">
      <div className={styles.inviteLinkBlock} />
      <Button type="submit" variant="secondary" className="appButton save">
        Send
      </Button>
    </div>
  );

  return (
    <ModalWindow isShown={isShown} onHide={handleCloseModal} modalClassName={styles.invitePopupContainer}>
      {modalHeader}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
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
