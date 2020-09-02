import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { updateAudioRoutine } from 'routines/user';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import AudioRecorder from 'containers/AudioRecorder';
import PlayAudioButton from 'components/PlayAudioButton';
import { uploadOnAWS, signS3Audio } from 'services/awsService';
import { toastr } from 'react-redux-toastr';
import LoaderWrapper from 'components/LoaderWrapper';

interface IProps {
  user?: IUser | null;
  handleClose: IBindingAction;
  updateAudio: (url: string) => void;
}

const PreferencesForm: FunctionComponent<IProps> = ({
  handleClose,
  updateAudio,
  user = undefined
}: IProps) => {
  if (!user) return <></>;
  const [userAudio, setUserAudio] = useState(user.audio);
  const [newAudioBlob, setNewAudioBlob] = useState<Blob | null>(null);
  const [recordingErr, setRecordingErr] = useState('');
  const isEdited = () => !newAudioBlob || !!recordingErr || user.audio === userAudio;
  const [isLoading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const { signedRequest, fileName, link } = await signS3Audio();
      if (newAudioBlob) {
        await uploadOnAWS(signedRequest, newAudioBlob, fileName, 'mp3');
        setUserAudio(link);
        await updateAudio(link);
      }
      setLoading(false);
    } catch (erorr) {
      toastr.error('Error', erorr.message);
    }
  };

  const onRecordingError = (error: string) => setRecordingErr(error);

  const onRecord = (blob: Blob | null, blobUrl: string | null) => {
    onRecordingError('');
    if (blob && blobUrl) {
      setNewAudioBlob(blob);
      setUserAudio(blobUrl);
    } else {
      setUserAudio(user.audio);
      setNewAudioBlob(null);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <LoaderWrapper loading={isLoading} height="100%">
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
            onClick={onSave}
          >
            Save Changes
          </Button>
        </div>
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.preferences,
  user: state.user.user
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  updateAudio: updateAudioRoutine
};

PreferencesForm.defaultProps = {
  user: null
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm);

