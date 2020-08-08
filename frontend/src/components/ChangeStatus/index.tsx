import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import EmojiPopUp from '../EmojiPopUp';
import { InputGroup, FormControl } from 'react-bootstrap';

const ChangeStatus: FunctionComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '' });
  const [crossStatus, setCrossStatus] = useState(false);
  const [status, setStatus] = useState('');
  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
    setCrossStatus(true);
  };
  const reset = () => {
    setChosenEmoji({ emoji: '' });
    setCrossStatus(false);
    setStatus('');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStatus(e.target.value);
    console.log(status);
  };
  useEffect(() => {
    console.log(chosenEmoji.emoji);
  }, [chosenEmoji]);
  const trigger = () => (
    <button
      type="button"
      className={`${styles.smileButton} ${styles.smileButton_reset}`}
    >
      {!chosenEmoji.emoji ? (
        <FontAwesomeIcon
          className={styles.smileIcon}
          icon={faGrin}
        />
      ) : (
        <p>{chosenEmoji.emoji}</p>
      )}
    </button>
  );
  return (
    <InputGroup className={styles.inputBlock}>
      <InputGroup.Prepend className={styles.emojiContainer}>
        <InputGroup.Text className={styles.emoji}>
          <EmojiPopUp trigger={trigger} onEmojiClick={onEmojiClick} />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="What is your status?"
        className={styles.input}
        type="text"
        value={status}
        onChange={onChange}
      />
      <InputGroup.Prepend className={styles.emojiContainer}>
        <InputGroup.Text className={styles.cross}>
          {crossStatus || status ? (
            <button
              type="button"
              className={`${styles.crossButton} ${styles.crossButton_reset}`}
              onClick={() => reset()}
            >
              <FontAwesomeIcon
                className={styles.crossIcon}
                icon={faTimesCircle}
              />
            </button>
          ) : (
            ''
          )}
        </InputGroup.Text>
      </InputGroup.Prepend>
    </InputGroup>
  );
};

export default ChangeStatus;
// eslint-disable-line max-len
