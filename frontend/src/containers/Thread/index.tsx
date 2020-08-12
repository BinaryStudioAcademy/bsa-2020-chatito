import React from 'react';
import styles from './styles.module.sass';
import { IThread } from 'common/models/thread/IThread';

interface IProps {
  thread: IThread;
}

const Thread: React.FC<IProps> = ({ thread }) => (
  <div className={styles.threadContainer}>
    <header>
      <p>{thread.name}</p>
    </header>
  </div>
);

export default Thread;
