import React, { useEffect, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import getBlobDuration from 'get-blob-duration';
import styles from './styles.module.sass';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

interface IProps {
  onRecord: (blob: Blob | null, blobUrl: string | null) => void;
  maxDuration?: number;
  onError?: (err: string) => void;
  showPlayer?: boolean;
}

const AudioRecorder: React.FC<IProps> = ({ onRecord, maxDuration, onError, showPlayer = false }) => {
  const [isBlocked, setBlocked] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<null | string>(null);
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => setBlocked(false),
      () => setBlocked(true));
  });

  const start = () => {
    if (!isBlocked) {
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true);
        });
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: [any[], Blob]) => { // eslint-disable-line
        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);
        setRecording(false);
        onRecord(blob, blobURL);
        return getBlobDuration(blob);
      }).then((duration: number) => {
        if (onError && maxDuration && duration > maxDuration) {
          onError(`Max duration is ${Math.floor(maxDuration)}, but yours - ${Math.floor(duration)}`);
        }
      })
      .catch(() => onError && onError('Some problems with player'));
  };

  const cancel = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(() => {
        setBlobUrl(null);
        setRecording(false);
        onRecord(null, '');
      })
      .catch(() => onError && onError('Some problems with player'));
  };

  return (
    <>
      <Button
        variant="secondary"
        className={`appButton save ${isRecording ? styles.buttonDisabled : ''}`}
        onClick={start}
        disabled={isRecording}
      >
        Record
      </Button>
      {isRecording && (
        <Button type="button" variant="outline-secondary" className="appButton danger" onClick={stop}>
          Stop
        </Button>
      )}
      {blobUrl && !isRecording && (
        <>
          <Button type="button" variant="secondary" className="appButton cancel" onClick={cancel}>
            Cancel
          </Button>
          {/* eslint-disable-next-line */}
          {showPlayer && <audio src={blobUrl as string} controls />}
        </>
      )}

    </>
  );
};

export default AudioRecorder;
