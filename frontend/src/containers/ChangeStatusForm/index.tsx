import { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import EmojiPopUp from 'components/EmojiPopUp';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { editStatusRoutine } from 'routines/user';
import { IAppState } from 'common/models/store';
import { IEditStatusData } from 'common/models/status/IEditStatusData';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  id: string;
  editStatus: (obj: IEditStatusData) => void;
  handleClose: IBindingAction;
}

const ChangeStatusForm: FunctionComponent<IProps> = ({ id, editStatus, handleClose }) => {
  const [chosenEmoji, setChosenEmoji] = useState('');
  const [crossStatus, setCrossStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [wasAutoChosen, setWasAutoChosen] = useState(false);
  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject.emoji);
    setCrossStatus(true);
    const emojiButton = document.getElementById('openSmilePopUp');
    if (emojiButton) {
      emojiButton.click();
    }
  };
  const reset = () => {
    setChosenEmoji('');
    setCrossStatus(false);
    setStatus('');
    setWasAutoChosen(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStatus(e.target.value);
    if (!chosenEmoji) {
      setChosenEmoji('💬');
      setWasAutoChosen(true);
    }
    if (e.target.value) {
      setCrossStatus(true);
    } else if (wasAutoChosen) {
      setCrossStatus(false);
      setChosenEmoji('');
      setWasAutoChosen(false);
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
  return (
    <div className={styles.childrenContainer}>
      <header className={`${styles.modalHeader} modalHeader`}>Set a status</header>
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
          className="appButton cancel"
          variant="outline-secondary"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          className="appButton save"
          variant="secondary"
          onClick={() => {
            editStatus({ id, status: `${chosenEmoji} ${status}` });
            handleClose();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({ id: state.user.user ? state.user.user.id : '' });

const mapDispatchToProps = {
  editStatus: editStatusRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusForm);
