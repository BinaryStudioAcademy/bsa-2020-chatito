import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import styles from './styles.module.sass';
import { env } from 'env';

interface IProps {
  githubUsername?: string;
  selectedRepository: string;
  showModal: IBindingCallback1<IModalRoutine>;
}

const CreateWebhooksInstructionModal: FunctionComponent<IProps> = ({
  githubUsername,
  selectedRepository,
  showModal
}) => {
  const handleCloseModal = () => {
    showModal({ modalType: ModalTypes.CreateRepositoryChat, show: false });
  };

  const getAddWebhookUrl = () => `https://github.com/${githubUsername}/${selectedRepository}/settings/hooks/new`;

  const getPayloadUrl = () => `${env.urls.server}/api/hooks/github`;

  const modalHeader = (
    <h4 className={styles.header}>Create GitHub webhook</h4>
  );

  const modalFooter = (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        onClick={handleCloseModal}
        className={styles.addButton}
      >
        Done
      </Button>
    </div>
  );

  return (
    <div>
      {modalHeader}
      <div className={styles.infoText}>
        Copy and follow the link below or go to the Webhooks setting of the selected repository.
      </div>
      <InputGroup className="mb-3">
        <FormControl
          defaultValue={getAddWebhookUrl()}
        />
      </InputGroup>

      <Image
        src={`${env.storage.s3}/assets/webhookInstruction.jpg`}
        fluid
        className={styles.infoImage}
      />

      <div className={styles.infoText}>Copy the following link and paste it in the Payload URL section.</div>
      <InputGroup className="mb-3">
        <FormControl
          defaultValue={getPayloadUrl()}
        />
      </InputGroup>

      <div className={styles.infoText}>
        Set content type to
        <b> application/json</b>
        . Choose events you like to trigger.
      </div>
      <div className={styles.infoText}>
        When all settings done press
        <b> Add webhook</b>
        , return to this page and press
        <b> Done</b>
        .
      </div>

      {modalFooter}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  githubUsername: state.user.user?.githubUsername
});

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWebhooksInstructionModal);
