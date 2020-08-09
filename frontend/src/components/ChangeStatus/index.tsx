import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import EmojiPopUp from '../EmojiPopUp';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import ModalWindow from '../ModalWindow';

const ChangeStatus: FunctionComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '' });
  const [crossStatus, setCrossStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const hideCloseBtn = true;
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
  interface IStatus {
    [key: string]: string;
  }
  const suggestedStatuses = [
    { icon: '🗓️', text: 'In a meeting' },
    { icon: '🚌', text: 'Commuting' },
    { icon: '🤒', text: 'Out sick' },
    { icon: '🌴', text: 'Vacationing' },
    { icon: '🏡', text: 'Working remotely' }
  ];
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
  const childrenForModal = (
    <div className={styles.childrenContainer}>
      <header className={styles.modalHeader}>Set a status</header>
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
      {crossStatus || status ? (
        ''
      ) : (
        <div className={styles.suggestedStatusesContainer}>
          {suggestedStatuses.map((item, index) => (
            <button
              type="button"
              id={`${index}`}
              className={styles.statusButton}
            >
              {item.icon}
              <p className={styles.statusText}>{item.text}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>Launch demo modal</Button>
      <ModalWindow
        isShown={show}
        onHide={handleClose}
        hideCloseBtn={hideCloseBtn}
        modalBody={styles.modalBody}
      >
        {childrenForModal}
      </ModalWindow>
    </div>
  );
};

export default ChangeStatus;
// eslint-disable-line max-len
