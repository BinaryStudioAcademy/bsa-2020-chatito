import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.sass';

interface IProps {
  show: boolean;
  toggle: () => void;
}

const CreateChannel = ({ show, toggle }: IProps) => {
  const [channelName, setChannelName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [privateChannel, setPrivateChannel] = useState<boolean>(false);
  const NAME_MAX_CHARACTERS = 80;

  const isNameEmpty = () => !channelName.length;

  const handleSubmit = () => {
    console.log(channelName, description, privateChannel);
  };

  const modalTitle = privateChannel
    ? 'Create a private channel'
    : 'Create a channel';

  const createPrivateDescription = (
    <p>
      <strong>This can’t be undone. </strong>
      A private channel cannot be made public later on.
    </p>
  );

  const createPublicDescription = (
    <p>
      When a channel is set to private, it can only be viewed or joined by invitation.
    </p>
  );

  const modalHeader = (
    <Modal.Header closeButton className={styles.modalHeader}>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
  );

  const nameInputFromGroup = (
    <Form.Group>
      <Form.Label htmlFor="channelName" className={styles.inputLabel}>
        Name
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className={styles.label} id="basic-addon1">
            #
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          id="channelName"
          type="text"
          placeholder="e.g. plan-budget"
          onChange={event => setChannelName(event.target.value)}
          required
          maxLength={NAME_MAX_CHARACTERS}
        />
      </InputGroup>
    </Form.Group>
  );

  const descriptionInputFormGroup = (
    <Form.Group controlId="descriptionInput">
      <Form.Label className={styles.inputLabel}>
        Description
        <span> (optional)</span>
      </Form.Label>
      <Form.Control
        type="text"
        onChange={e => setDescription(e.target.value)}
      />
      <Form.Text>What this channel about?</Form.Text>
    </Form.Group>
  );

  const makePrivateFormGroup = (
    <Form.Group>
      <Form.Label className={styles.makePrivateLabel}>
        <div className={styles.makePrivateDescription}>
          <h5>Make private</h5>
          {privateChannel ? createPrivateDescription : createPublicDescription}
        </div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label
          onChange={() => setPrivateChannel(!privateChannel)}
          className={styles.makePrivateSwitch}
        />
      </Form.Label>
    </Form.Group>
  );

  const modalBody = (
    <Modal.Body className={styles.modalBody}>
      <p className={styles.modalDescription}>
        Channels are where your team communicates. They&apos;re best when
        organized around a topic - #marketing, for example.
      </p>
      <Form>
        {nameInputFromGroup}
        {descriptionInputFormGroup}
        {makePrivateFormGroup}
      </Form>
    </Modal.Body>
  );

  const modalFooter = (
    <Modal.Footer className={styles.modalFooter}>
      <Button
        disabled={isNameEmpty()}
        variant="primary"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Modal.Footer>
  );

  return (
    <Modal show={show} onHide={toggle} className={styles.modal}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </Modal>
  );
};

const Container = () => {
  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create channel
      </Button>
      <CreateChannel show={showModal} toggle={toggleModal} />
    </>
  );
};

export default Container;
