import React from 'react';
import { IDraftClient } from 'common/models/draft/IDraftClient';
import styles from './styles.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTrashAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { connect } from 'react-redux';

interface IProps {
  draft: IDraftClient;
  whash: string;
  router: (url: string) => {};
}

const DraftCard: React.FC<IProps> = ({ draft, whash, router }) => {
  const onGoToChat = () => router(Routes.Chat.replace(':whash', whash).replace(':chash', draft.chat.hash));
  return (
    <div className={styles.card}>
      <button type="button" className={styles.cardHeader} onClick={onGoToChat}>{draft.chat.name}</button>
      {/* eslint-disable-next-line */}
      <p dangerouslySetInnerHTML={{ __html: draft.text }} />
      <div className={styles.buttons}>
        <FontAwesomeIcon className={styles.button} icon={faPaperPlane} />
        <FontAwesomeIcon className={styles.button} icon={faTrashAlt} />
        <FontAwesomeIcon className={styles.button} icon={faPen} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  router: push
};

export default connect(null, mapDispatchToProps)(DraftCard);
