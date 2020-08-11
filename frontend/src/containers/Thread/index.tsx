import React from 'react';
import styles from './styles.module.sass';

interface IProps {
  thread: string;
}

const Thread: React.FC<IProps> = ({ thread }) => (
  <div className={styles.threadContainer}>
    <header>
      <p>{thread}</p>
    </header>
  </div>
);

export default Thread;
