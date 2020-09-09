import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { faLock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';

interface IProps {
  createChannel: IBindingCallback1<any>;
}

const CreateChannel = ({ createChannel }: IProps) => {
  const [channelName, setChannelName] = useState<string>('');
  const [channelDescription, setChannelDescription] = useState<string>('');
  const [privateChannel, setPrivateChannel] = useState<boolean>(false);
  const nameMaxCharacters = 80;

  const isNameEmpty = () => !channelName.length;

  const handleSubmit = () => {
    createChannel({
      name: channelName,
      description: channelDescription,
      isPrivate: privateChannel
    });
  };

  const title = privateChannel
    ? 'Create a private channel'
    : 'Create a channel';

  const createPrivateDescription = (
    <p className={styles.channelDescription}>
      <strong>This can’t be undone. </strong>
      A private channel cannot be made public later on.
    </p>
  );

  const createPublicDescription = (
    <p className={styles.channelDescription}>
      When a channel is set to private, it can only be viewed or joined by invitation.
    </p>
  );

  const formHeader = (
    <header className="modalHeader">{title}</header>
  );

  const nameInputFromGroup = (
    <Form.Group>
      <Form.Label htmlFor="channelName" className={styles.inputLabel}>
        Name
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className={`${styles.label} inputField`} id="basic-addon1">
            <FontAwesomeIcon icon={privateChannel ? faLock : faHashtag} size="xs" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          id="channelName"
          type="text"
          placeholder="e.g. plan-budget"
          onChange={event => setChannelName(event.target.value)}
          required
          maxLength={nameMaxCharacters}
          className="inputField"
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
        onChange={e => setChannelDescription(e.target.value)}
        className="inputField"
      />
      <Form.Text className={`${styles.description} text-muted`}>What this channel about?</Form.Text>
    </Form.Group>
  );

  const makePrivateFormGroup = (
    <Form.Group>
      <Form.Label className={styles.makePrivateLabel}>
        <div className={styles.makePrivateDescription}>
          <p className={`${styles.inputLabel} ${styles.makePrivate}`}>Make private</p>
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

  const formBody = (
    <div className="modalBody">
      <p className={styles.formDescription}>
        Channels are where your team communicates. They&apos;re best when
        organized around a topic - #marketing, for example.
      </p>
      <Form>
        {nameInputFromGroup}
        {descriptionInputFormGroup}
        {makePrivateFormGroup}
      </Form>
    </div>
  );

  const formFooter = (
    <div className="buttonsContainer">
      <Button
        disabled={isNameEmpty()}
        variant="secondary"
        onClick={handleSubmit}
        className="appButton save"
      >
        Create
      </Button>
    </div>
  );

  return (
    <>
      {formHeader}
      {formBody}
      {formFooter}
    </>
  );
};

export default CreateChannel;
