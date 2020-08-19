import React from 'react';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IDraftComment } from 'common/models/draft/IDraftComment';
import styles from './styles.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTrashAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  draft: IDraftComment | IDraftPost;
}

// eslint-disable-next-line
const DraftCard: React.FC<IProps> = ({ draft }) => {
  return (
    <div className={styles.card} key={draft.id}>
      {draft.text}
      <div className={styles.buttons}>
        <FontAwesomeIcon className={styles.button} icon={faPaperPlane} />
        <FontAwesomeIcon className={styles.button} icon={faTrashAlt} />
        <FontAwesomeIcon className={styles.button} icon={faPen} />
      </div>
    </div>
  );
};

export default DraftCard;
