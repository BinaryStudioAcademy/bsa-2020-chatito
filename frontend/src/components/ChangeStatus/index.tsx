import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import EmojiPopUp from '../EmojiPopUp';
// interface IEmojiClickParams {
//   event: MouseEvent;
//   emojiObject: IEmojiData;
// }

// interface IEmojiClick {
//   onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void
// }

const ChangeStatus: FunctionComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '' });
  const [showEmojiStatus, setShowEmojiStatus] = useState(false);
  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
  };
  const showEmojiPopUp = () => {
    setShowEmojiStatus(!showEmojiStatus);
  };
  useEffect(() => {
    console.log(showEmojiStatus);
  }, [showEmojiStatus]);
  return (
    <EmojiPopUp />
    // <div>
    //   <button
    //     type="button"
    //     className={`${styles.arrowButton} ${styles.arrowButton_reset}`}
    //     onClick={() => showEmojiPopUp()}
    //   >
    //     <FontAwesomeIcon
    //       className={styles.arrowIcon}
    //       icon={faLocationArrow}
    //     />
    //   </button>
    //   {chosenEmoji ? (
    //     <span>
    //       You chose:
    //       {chosenEmoji.emoji}
    //     </span>
    //   ) : (
    //     <span>No emoji Chosen</span>
    //   )}
    //   <Picker onEmojiClick={onEmojiClick} />
    // </div>
  );
};

export default ChangeStatus;
