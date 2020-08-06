import React from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.sass';

interface IProps {
  show: boolean;
  toggle: () => void;
}

const CreateChannel = ({ show, toggle }: IProps) => {
  const handleClick = () => {
    toggle();
  };

  return (
    <Modal show onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Create a channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Channels are where your team communicates. They&apos;re best when
          organized around a topic - #marketing, for example.
        </p>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="channel-name">Name</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text className={styles.label} id="basic-addon1">
                  #
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="channel-name"
                type="text"
                placeholder="e.g. plan-budget"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control type="text" />
            <Form.Text>What this channel about?</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.makePrivateLabel}>
              <div>
                <h5>Make private</h5>
                <p>
                  When a channel is set to private, it can only be viewed or
                  joined by invitation.
                </p>
              </div>
              <Form.Check type="switch" id="custom-switch" label className={styles.makePrivateSwitch} />
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toggle}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Container = () => {
  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => setShowModal(!showModal);

  console.log(showModal);
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
