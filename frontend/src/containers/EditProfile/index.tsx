import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Image } from 'react-bootstrap';
import { IAppState } from '../../common/models/store';
import { showModalRoutine } from '../../routines/modal';
import { editProfileRoutine, deleteAccountRoutine } from '../../routines/user';
import styles from './styles.module.sass';
import { IUser } from '../../common/models/user/user';
import { ModalTypes } from '../../common/enums/ModalTypes';
import { IModalRoutine } from '../../common/models/modal/IShowModalRoutine';

interface IProps {
  showModal: ({ modalType, show }: IModalRoutine) => void;
  editProfile: (userProps: IUser) => void;
  deleteAccount: () => void;
  isShown: boolean;
  user?: IUser | null;
}

const EditProfile: FunctionComponent<IProps> = ({
  showModal,
  editProfile,
  deleteAccount,
  isShown,
  user = undefined
}: IProps) => {
  if (!user) return <></>;
  const [fullName, setFullName] = useState(user.fullName);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [title, setTitle] = useState(user.title ? user.title : '');

  const handleClose = () => {
    showModal({ modalType: ModalTypes.EditProfile, show: false });
  };

  const handleSubmit = () => {
    const editUserProps = { ...user, fullName, displayName, title };
    editProfile(editUserProps);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.currentTarget;
    switch (id) {
      case 'formEditFullName': {
        setFullName(value);
        break;
      }
      case 'formEditDisplayName': {
        setDisplayName(value);
        break;
      }
      case 'formEditTitle': {
        setTitle(value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row">
          <Form>
            <Form.Group controlId="formEditFullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEditDisplayName">
              <Form.Label>Display name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                This could be your nickname — however you’d like people to refer
                to you in Chatito.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formEditTitle">
              <Form.Label>What I do</Form.Label>
              <Form.Control
                type="text"
                placeholder="What I do"
                value={title}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Let people know what you do at this channel.
              </Form.Text>
            </Form.Group>
          </Form>
          <div
            className={`d-flex flex-column align-items-center ${styles.imageEditBlock}`}
          >
            <span className={styles.imageLabel}>Profile photo</span>
            {user.imageUrl ? (
              <Image
                className={styles.image}
                height={150}
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                rounded
              />
            ) : null}
            <Button variant="light" className={styles.imageEditButton}>
              Upload an Image
            </Button>
            {user.imageUrl ? (
              <Button variant="link" className={styles.imageEditButton}>
                Remove photo
              </Button>
            ) : null}
            <Button variant="light" className={styles.deleteAccountButton} onClick={handleDeleteAccount}>
              Delete account
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.editProfile,
  user: state.user.data
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  editProfile: editProfileRoutine,
  deleteAccount: deleteAccountRoutine
};

EditProfile.defaultProps = {
  user: null
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
