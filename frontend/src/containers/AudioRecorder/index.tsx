import React, { useEffect, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import getBlobDuration from 'get-blob-duration';
import styles from './styles.module.sass';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

interface IProps {
  onRecord: (blob: Blob | null, blobUrl: string | null) => void;
  maxDuration: number;
  onError?: (err: string) => void;
  showPlayer?: boolean;
}

const AudioRecorder: React.FC<IProps> = ({ onRecord, maxDuration, onError, showPlayer = false }) => {
  const [isBlocked, setBlocked] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [blobUrl, setBlobUrl] = useState<null | string>(null);
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => setBlocked(false),
      () => setBlocked(true));
  });

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
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
          onError(`Max duration is ${Math.floor(maxDuration)}, but yours - ${Math.ceil(duration)}`);
        }
      })
      .catch(() => onError && onError('Some problems with player'));
  };

  const start = () => {
    if (!isBlocked) {
      let timerTmp = 0;
      const newIntervalId = setInterval(() => {
        timerTmp += 100;
        setTimer(timerTmp);
      }, 100);
      setIntervalId(newIntervalId);
      setTimeout(() => {
        clearInterval(newIntervalId);
        stop();
      }, maxDuration * 1000 + 300);
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true);
        });
    }
  };

  const cancel = () => {
    setTimer(1);
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
      <ProgressBar now={Math.ceil(timer / (maxDuration * 10))} variant="success" className={styles.progressBar} />
      <p className={styles.description}>{`It must be less than ${maxDuration} seconds long`}</p>
    </>
  );
};

export default AudioRecorder;
