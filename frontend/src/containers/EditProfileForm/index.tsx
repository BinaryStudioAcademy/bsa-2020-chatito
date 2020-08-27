import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Form } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { editProfileRoutine, deleteAccountRoutine } from 'routines/user';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import { getUserImgLink } from 'common/helpers/imageHelper';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { signS3, uploadPhoto } from 'services/awsService';
import { toastr } from 'react-redux-toastr';

interface IProps {
  editProfile: IBindingCallback1<IUser>;
  deleteAccount: IBindingAction;
  handleClose: IBindingAction;
  user?: IUser | null;
}

const EditProfileForm: FunctionComponent<IProps> = ({
  editProfile,
  deleteAccount,
  handleClose,
  user = undefined
}: IProps) => {
  if (!user) return <></>;
  const [fullName, setFullName] = useState(user.fullName);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [title, setTitle] = useState(user.title ? user.title : '');
  const [showMoreOptions, setshowMoreOptions] = useState(false);

  const handleSubmit = () => {
    const editUserProps = { ...user, fullName, displayName, title };
    editProfile(editUserProps);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target as HTMLInputElement;

      if (!target.files) return;

      const file = target.files[0];
      const fileType = file.name.split('.')[1];

      const signedData = await signS3(fileType);

      const { signedRequest, url, fileName } = signedData;

      const response = await uploadPhoto(signedRequest, fileName, fileType, file);
      console.log(response);
    } catch (error) {
      toastr.error('Upload error', error.message);
    }
  };

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
    <div className={styles.mainContainer}>
      <header className={styles.modalHeader}>Edit your profile</header>
      <div className={styles.body}>
        <Form>
          <Form.Group controlId="formEditFullName" className={styles.inputBlock}>
            <span className={styles.inputHeader}>Full name</span>
            <Form.Control
              className={styles.inputGroup}
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEditDisplayName" className={styles.inputBlock}>
            <span className={styles.inputHeader}>Display name</span>
            <Form.Control
              className={styles.inputGroup}
              type="text"
              placeholder="Display name"
              value={displayName}
              onChange={handleChange}
            />
            <div className={styles.description}>
              This could be your nickname — however you’d like
              people to refer to you in Chatito.
            </div>
          </Form.Group>
          <Form.Group controlId="formEditTitle" className={styles.inputBlock}>
            <span className={styles.inputHeader}>Live position</span>
            <Form.Control
              className={styles.inputGroup}
              type="text"
              placeholder="Live position"
              value={title}
              onChange={handleChange}
            />
            <div className={styles.description}>
              Let people know what you do at this channel.
            </div>
          </Form.Group>
          <div className={`${styles.formFooter} w-100`}>
            <Button className={styles.primaryBtnCancel} variant="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className={styles.primaryBtn} type="button" variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </Form>
        <div
          className={`d-flex flex-column align-items-center ${styles.imageEditBlock}`}
        >
          <div>
            <Image
              className={styles.image}
              height={150}
              src={getUserImgLink(user.imageUrl as string)}
            />
            <div className={`${styles.imageFooter} w-100`}>
              <div>
                <label htmlFor="image_uploads">
                  <span>Upload image</span>
                  <input
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleUpload}
                  />
                </label>
              </div>
              {user.imageUrl ? (
                <button type="submit" className={styles.link}>
                  Remove photo
                </button>
              ) : null}
            </div>
          </div>
          <div className={styles.options}>
            <button
              type="submit"
              className={`${styles.link} ${styles.showMore}`}
              onClick={() => setshowMoreOptions(!showMoreOptions)}
            >
              {!showMoreOptions ? 'Show more options' : 'Hide options'}
            </button>
            {showMoreOptions ? (
              <Button
                className={styles.primaryBtnDelete}
                variant="primary"
                onClick={handleDeleteAccount}
              >
                Delete account
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.editProfile,
  user: state.user.user
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  editProfile: editProfileRoutine,
  deleteAccount: deleteAccountRoutine
};

EditProfileForm.defaultProps = {
  user: null
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);

