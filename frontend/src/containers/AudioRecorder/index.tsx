import React, { useEffect, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import getBlobDuration from 'get-blob-duration';
import styles from './styles.module.sass';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AudioRecorder = () => {
  const a = 5;
  const [isBlocked, setBlocked] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<null | string>(null);
  const [bufferStr, setBuffer] = useState('');
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setBlocked(true);
      });
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

        return getBlobDuration(blob);
      }).then((duration: string | number) => {
        console.log(duration, ' seconds');
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
        setRecording(false);
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
          <audio src={blobUrl as string} controls />
        </>
      )}

    </>
  );
};

export default AudioRecorder;
