import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Form } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { editProfileRoutine, deleteAccountRoutine } from 'routines/user';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { CropAvatar } from 'components/CropAvatar';
import { env } from 'env';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import { deleteAWSObject } from 'services/awsService';
import { allowedFileTypes } from 'config/allowedFileTypes';
import { toastr } from 'react-redux-toastr';

interface IProps {
  editProfile: IBindingCallback1<IUser>;
  deleteAccount: IBindingAction;
  handleClose: IBindingAction;
  user: IUser | undefined;
}

const EditProfileForm: FunctionComponent<IProps> = ({
  editProfile,
  deleteAccount,
  handleClose,
  user
}: IProps) => {
  if (!user) return <></>;
  const [fullName, setFullName] = useState(user.fullName);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [title, setTitle] = useState(user.title ? user.title : '');
  const [imageUrl, setImageUrl] = useState(user.imageUrl || '');
  const [showMoreOptions, setshowMoreOptions] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleSubmit = () => {
    const editUserProps = { ...user, fullName, displayName, title, imageUrl };
    editProfile(editUserProps);
    if (user.imageUrl && user.imageUrl !== imageUrl) {
      deleteAWSObject(user.imageUrl);
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!allowedFileTypes.includes(e.target.files[0].type)) {
        toastr.error('Error', 'Forbidden file type. Please choose image with type .png, .jpg or .jpeg');
      }
      const reader = new FileReader();
      setAvatarLoading(true);
      reader.addEventListener('load', () => {
        setAvatar(reader.result as string);
        setAvatarLoading(false);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearAvatarData = () => {
    setAvatar('');
  };

  const setImageUrlHandler = (filename: string) => setImageUrl(`/avatars/${filename}`);

  const handleDeleteAvatar = () => {
    setImageUrl('');
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

  const getImageSource = () => {
    if (imageUrl.startsWith('https')) {
      return imageUrl;
    }
    if (imageUrl) {
      return `${env.urls.aws}${imageUrl}`;
    }
    return userLogoDefaultUrl;
  };

  if (avatar || avatarLoading) {
    return (
      <CropAvatar
        src={avatar}
        avatarLoading={avatarLoading}
        clearAvatarData={clearAvatarData}
        setImageUrl={setImageUrlHandler}
        handleClose={handleClose}
      />
    );
  }

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
            <span className={styles.inputHeader}>Life position</span>
            <Form.Control
              className={styles.inputGroup}
              type="text"
              placeholder="Life position"
              value={title}
              onChange={handleChange}
            />
            <div className={styles.description}>
              Write here your life principles, your motto, or some fun facts about yourself.
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
              src={getImageSource()}
            />
            <div className={`${styles.imageFooter} w-100`}>
              <div className={styles.uploadWrp}>
                <Form.Label
                  htmlFor="uploadAvatar"
                  className={[styles.uploadAvatarLabel, styles.link].join(' ')}
                >
                  Upload an image
                </Form.Label>
                <Form.Control
                  id="uploadAvatar"
                  type="file"
                  onChange={onSelectFile}
                  className={styles.uploadAvatar}
                />
              </div>
              {user.imageUrl ? (
                <button
                  type="button"
                  className={[styles.link, styles.removePhoto].join(' ')}
                  onClick={handleDeleteAvatar}
                >
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);

