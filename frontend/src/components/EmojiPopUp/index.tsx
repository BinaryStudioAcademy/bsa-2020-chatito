import { OverlayTrigger, Popover } from 'react-bootstrap';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';

interface IProps {
  trigger: () => JSX.Element;
  onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void;
}

const EmojiPopUp: FunctionComponent<IProps> = ({ onEmojiClick, trigger }) => {
  const showEmoji = (
    <Popover id="emojiPopUp" className={styles.popUpContainer}>
      <div className={styles.emojiContainer}>
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={showEmoji}>
      {trigger()}
    </OverlayTrigger>
  );
};

export default EmojiPopUp;
