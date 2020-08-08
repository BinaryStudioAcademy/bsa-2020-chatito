import React, { FunctionComponent, CSSProperties } from 'react';
import PartisipantsList from '../ParticipantsList';
import TextEditor from '../TextEditor';
import styles from './styles.module.sass';
import { IUser } from '../../common/models/user';

interface IProps {
  width: number | string;
  participants: IUser[];
  // comments;
}

const createMessage = (text = '') => <div className={styles.mockMessage}>{text}</div>;

const Thread: FunctionComponent<IProps> = ({ width, participants }) => {
  const usNamesList = participants.map(us => us.fullname);
  // MOCK
  const testUsNamesList = ['yarek1', 'yarek2', 'yarek3', 'yarek4'];
  const testMessages = [{ text: 'asdasdasdasdads' }, { text: 'Lorem lorem lorem' }, { text: 'I dont now' }];

  return (
    <div className={styles.threadContainer} style={{ width }}>
      <header>
        <p className={styles.threadChatName}>
          Thread name
        </p>
        <p>
          <PartisipantsList userNamesList={testUsNamesList} />
        </p>
      </header>

      <div className={styles.threadComments}>

        <div className={styles.commentsWrapper}>
          {testMessages.map(m => createMessage(m.text))}
        </div>

        <TextEditor placeholder="write a comment!" onSend={m => console.log('Send: ', m)} height={130} />
      </div>
    </div>
  );
};

export default Thread;
