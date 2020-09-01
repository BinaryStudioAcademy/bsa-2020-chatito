import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Form } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { editProfileRoutine } from 'routines/user';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import { getUserImgLink } from 'common/helpers/imageHelper';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import AudioRecorder from 'containers/AudioRecorder';
import PlayAudioButton from 'components/PlayAudioButton';

interface IProps {
  user?: IUser | null;
  editProfile: IBindingCallback1<IUser>;
  handleClose: IBindingAction;
}

const PreferencesForm: FunctionComponent<IProps> = ({
  handleClose,
  editProfile,
  user = undefined
}: IProps) => {
  if (!user) return <></>;
  const [userAudio, setUserAudio] = useState(user.audio);
  const [newAudioBuffer, setNewAudioBuffer] = useState<any[] | null>(null);
  const [recordingErr, setRecordingErr] = useState('');
  const isEdited = () => !newAudioBuffer || !!recordingErr;
  // const [fullName, setFullName] = useState(user.fullName);
  // const [displayName, setDisplayName] = useState(user.displayName);
  // const [title, setTitle] = useState(user.title ? user.title : '');
  // const [showMoreOptions, setshowMoreOptions] = useState(false);
  // const handleSubmit = () => {
  //   const editUserProps = { ...user, fullName, displayName, title };
  //   editProfile(editUserProps);
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, id } = event.currentTarget;
  //   switch (id) {
  //     case 'formEditFullName': {
  //       setFullName(value);
  //       break;
  //     }
  //     case 'formEditDisplayName': {
  //       setDisplayName(value);
  //       break;
  //     }
  //     case 'formEditTitle': {
  //       setTitle(value);
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };
  const handleSubmit = () => {
    console.log('SUBMIT');
    // handleClose();

  };

  const onRecordingError = (error: string) => setRecordingErr(error);

  const onRecord = (buffer: any[], blobUrl: string | null) => {
    console.log('ONRECORD');
    console.log(buffer);
    console.log(blobUrl);
    onRecordingError('');
    if (buffer.length && blobUrl) {
      setNewAudioBuffer(buffer);
      setUserAudio(blobUrl);
    } else {
      setUserAudio(user.audio);
      setNewAudioBuffer(null);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <header className={styles.modalHeader}>
        Preferences
      </header>

      <h3 className={styles.subHeader}>Notifications:</h3>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Allow other users to use custom notifications sound" />
      </Form.Group>

      <h3 className={styles.subHeader}>My notification:</h3>

      <div className={`${styles.audioNotificationsWrapper}`}>
        <PlayAudioButton audioUrl={userAudio} />
        <div className={styles.recorderWrapper}>
          <AudioRecorder onRecord={onRecord} maxDuration={3} onError={onRecordingError} />
        </div>
      </div>

      {recordingErr && (<div className={styles.recordingErr}>{recordingErr}</div>)}

      <div className={`${styles.formFooter} w-100`}>
        <Button className={styles.primaryBtnCancel} variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          className={styles.primaryBtn}
          type="button"
          variant="success"
          disabled={isEdited()}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.preferences,
  user: state.user.user
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  editProfile: editProfileRoutine
};

PreferencesForm.defaultProps = {
  user: null
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm);

