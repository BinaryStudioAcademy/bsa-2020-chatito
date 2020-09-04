import React from 'react';
import styles from './styles.module.sass';

interface IProps {
  url: string;
  creator?: string;
}

const JoinButton: React.FC<IProps> = ({ url, creator }) => (
  <div className={styles.wrapper}>
    <div className={styles.innerWrapper}>
      <img
        className={styles.whaleLogo}
        src="https://img.icons8.com/flat_round/64/000000/whale--v1.png"
        alt="Whale logo"
      />
      <span>
        Whale meeting started by&nbsp;
        {creator}
      </span>
    </div>
    <hr className={styles.line} />
    <a href={url} rel="noopener noreferrer" target="_blank" className={styles.btnJoin}>Join</a>
  </div>
);

export default JoinButton;
