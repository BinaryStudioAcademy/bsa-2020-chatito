import { OverlayTrigger, Popover } from 'react-bootstrap';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FunctionComponent, useState, useRef } from 'react';
import styles from './styles.module.sass';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  trigger: (onTriggerClick: IBindingAction, triggerRef: React.RefObject<HTMLButtonElement>) => JSX.Element;
  onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void;
}

const EmojiPopUp: FunctionComponent<IProps> = ({ onEmojiClick, trigger }) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const triggerRef = useRef<HTMLButtonElement>(null);

  const showEmoji = (props: any) => (
    <div className={styles.container}>
      <Popover id="emojiPopUp" className={styles.popUpContainer} {...props}>
        <div className={styles.emojiContainer}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </Popover>
    </div>
  );

  const getPosition = (): 'top' | 'bottom' => {
    if (!triggerRef?.current) return 'bottom';
    const { bottom, top } = triggerRef.current.getBoundingClientRect();
    if (bottom + 340 > document.body.clientHeight && top > 340) {
      return 'top';
    }
    return 'bottom';
  };

  const onTriggerClick = () => {
    setPosition(getPosition());
  };

  return (
    <OverlayTrigger trigger="click" rootClose placement={position} overlay={showEmoji}>
      {trigger(onTriggerClick, triggerRef)}
    </OverlayTrigger>
  );
};

export default EmojiPopUp;
