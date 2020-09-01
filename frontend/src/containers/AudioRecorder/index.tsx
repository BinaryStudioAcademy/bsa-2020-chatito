import React, { useEffect, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import getBlobDuration from 'get-blob-duration';
import styles from './styles.module.sass';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

interface IProps {
  onRecord: (buffer: any[], blobUrl: string | null) => void;
  maxDuration?: number;
  onError?: (err: string) => void;
  showPlayer?: boolean;
}

const AudioRecorder: React.FC<IProps> = ({ onRecord, maxDuration, onError, showPlayer = false }) => {
  const a = 5;
  const [isBlocked, setBlocked] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<null | string>(null);
  const [bufferStr, setBuffer] = useState([]);
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => setBlocked(false),
      () => setBlocked(true));
  });

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true);
        }).catch((e: any) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: [any, any]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);
        setRecording(false);
        setBuffer(buffer);

        onRecord(buffer, blobURL);
        return getBlobDuration(blob);
      }).then((duration: number) => {
        if (onError && maxDuration && duration > maxDuration) {
          onError(`Max duration is ${Math.floor(maxDuration)}, but yours - ${Math.floor(duration)}`);
        }
        console.log('Duration ', duration);
      })
      .catch((e: any) => console.error(e));
  };

  const cancel = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: [any, any]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(null);
        setBuffer([]);
        setRecording(false);
        onRecord([], '');
      })
      .catch((e: any) => console.error(e));
  };

  return (
    <>
      <Button
        type="button"
        variant="success"
        className={`${styles.buttonRecord} ${isRecording ? styles.buttonDisabled : ''}`}
        onClick={start}
        disabled={isRecording}
      >
        Record
      </Button>
      {isRecording && (
        <Button type="button" variant="danger" className={styles.buttonStopRecord} onClick={stop}>
          Stop
        </Button>
      )}
      {blobUrl && (
        <>
          <Button type="button" variant="secondary" className={styles.buttoCancel} onClick={cancel}>
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
