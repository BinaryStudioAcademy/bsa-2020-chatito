/* eslint-disable react/no-danger */
import React from 'react';
import { IDraftClient } from 'common/models/draft/IDraftClient';
import styles from './styles.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faTrashAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import { openThreadRoutine } from '../../routines';

interface IProps {
  draft: IDraftClient;
  whash: string;
  router: (url: string) => {};
  openThread: (id: string) => {};
}

const DraftCard: React.FC<IProps> = ({ draft, whash, router, openThread }) => {
  const onGoToChat = () => {
    if (draft.postId) {
      // It isn't working well
      // router(Routes.Post.replace(':whash', whash)
      // .replace(':chash', draft.chat.hash).replace(':postId', draft.postId));
      openThread(draft.postId);
    } else {
      router(Routes.Chat.replace(':whash', whash).replace(':chash', draft.chat.hash));
    }
  };

  return (
    <div className={styles.card}>
      <button type="button" className={styles.cardHeader} onClick={onGoToChat}>{draft.chat.name}</button>
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draft.text, { ADD_ATTR: ['target'] }) }} />
      <div className={styles.buttons}>
        <FontAwesomeIcon className={styles.button} icon={faPlay} />
        <FontAwesomeIcon className={styles.button} icon={faTrashAlt} />
        <FontAwesomeIcon className={styles.button} icon={faPen} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  router: push,
  openThread: openThreadRoutine
};

export default connect(null, mapDispatchToProps)(DraftCard);
