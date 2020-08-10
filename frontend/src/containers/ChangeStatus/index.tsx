import { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import EmojiPopUp from '../../components/EmojiPopUp';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import ModalWindow from '../../components/ModalWindow';
import { editStatusRoutine } from '../../routines/user';
import { IAppState } from '../../common/models/store';
import { IEditStatusData } from '../../services/statusService';

interface IProps {
  id: string;
  editStatus: (obj: IEditStatusData) => void;
}

const ChangeStatus: FunctionComponent<IProps> = ({ id, editStatus }) => {
  const [chosenEmoji, setChosenEmoji] = useState('');
  const [crossStatus, setCrossStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const hideCloseBtn = true;
  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject.emoji);
    setCrossStatus(true);
    const emojiButton = document.getElementById('openSmilePopUp');
    emojiButton!.click();
  };
  const reset = () => {
    setChosenEmoji('');
    setCrossStatus(false);
    setStatus('');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStatus(e.target.value);
    if (e.target.value) {
      setCrossStatus(true);
    } else {
      setCrossStatus(false);
    }
  };
  const suggestedStatuses = [
    { icon: '🗓️', text: 'In a meeting', id: '1' },
    { icon: '🚌', text: 'Commuting', id: '2' },
    { icon: '🤒', text: 'Out sick', id: '3' },
    { icon: '🌴', text: 'Vacationing', id: '4' },
    { icon: '🏡', text: 'Working remotely', id: '5' }
  ];
  const trigger = () => (
    <button
      id="openSmilePopUp"
      type="button"
      className={`${styles.smileButton} ${styles.smileButton_reset}`}
    >
      {!chosenEmoji ? (
        <FontAwesomeIcon
          className={styles.smileIcon}
          icon={faGrin}
        />
      ) : (
        <p>{chosenEmoji}</p>
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
          maxLength={100}
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
              key={item.id}
              type="button"
              id={`${index}`}
              className={styles.statusButton}
              onClick={() => {
                setChosenEmoji(suggestedStatuses[index].icon);
                setStatus(suggestedStatuses[index].text);
                setCrossStatus(true);
              }}
            >
              {item.icon}
              <p className={styles.statusText}>{item.text}</p>
            </button>
          ))}
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <Button
          className={`${styles.setStatusButton} ${styles.cancel}`}
          variant="outline-secondary"
          onClick={() => {
            setShow(!show);
            setTimeout(() => { reset(); }, 200);
          }}
        >
          Cancel
        </Button>
        <Button
          className={`${styles.setStatusButton} ${styles.save}`}
          variant="secondary"
          disabled={!crossStatus}
          onClick={() => {
            editStatus({ id, status: `${chosenEmoji} ${status}` });
            setShow(!show);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>Button to change</Button>
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

const mapStateToProps = (state: IAppState) => ({ id: state.user.user!.id });

const mapDispatchToProps = {
  editStatus: editStatusRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatus);
