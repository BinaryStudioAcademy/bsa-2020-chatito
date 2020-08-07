import React, { FunctionComponent, CSSProperties } from 'react';
import PartisipantsList from '../../components/ParticipantsList';
import TextEditor from '../../../../components/TextEditor';
import styles from './styles.module.sass';

interface IProps {
  width: number | string;

}

const Thread: FunctionComponent<IProps> = ({ width }) => (
  <div className={styles.threadContainer} style={{ width }}>
    <header>
      <p className={styles.threadChatName}>
        Thread name
      </p>
      <p>
        <PartisipantsList userNamesList={['yarek1', 'yarek2', 'yarek3', 'yarek4']} />
      </p>
    </header>

    <div className={styles.threadComments}>

      <div className={styles.commentsWrapper}>
        messages
      </div>

      <TextEditor placeholder="write a comment!" onSend={m => console.log('Send: ', m)} height={130} />
    </div>
  </div>
);

export default Thread;
