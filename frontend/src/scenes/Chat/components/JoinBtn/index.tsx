import React from 'react';
import styles from './styles.module.sass';

interface IProps {
  url: string;
}

const JoinButton: React.FC<IProps> = ({ url }) => (
  <div className={styles.wrapper}>
    <a href={url} className={styles.btnJoin}>Join</a>
  </div>
);

export default JoinButton;
