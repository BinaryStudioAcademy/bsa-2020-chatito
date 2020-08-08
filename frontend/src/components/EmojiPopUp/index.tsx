import { OverlayTrigger, Button, Image, Popover, Form } from 'react-bootstrap';
import { IUser } from '../../common/models/user/IUser';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { IBindingCallback1 } from '../../common/models/callback';
import { ISendMessage } from '../../common/models/message/ISendMessage';
import styles from './styles.module.sass';

interface IProps {
  user: IUser;
  trigger: () => React.ReactElement;
  id: string;
  onSend: IBindingCallback1<ISendMessage>;
}

// Mocked data: testData and trigger function
const testData = {
  id: '1'
};
const trigger = () => <Button variant="success">Show</Button>;

// const ProfilePreview: FunctionComponent<IProps> = ({ user, trigger, id, onSend }) => {
const EmojiPopUp: FunctionComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '' });
  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
  };
  const showEmoji = (
    <Popover id={testData.id} className={styles.popUpContainer}>
      <div>
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={showEmoji}>
      {trigger()}
    </OverlayTrigger>
  );
};

export default EmojiPopUp;
