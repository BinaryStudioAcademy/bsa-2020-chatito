import React, { FunctionComponent } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'components/Post';
import styles from './styles.module.sass';

import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  width?: number | string;
  post: IPost;
  comments: IPost[];
  sendComment: IBindingCallback1<string>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
}

const createMessage = (id: string, text = '') => <div key={id} className={styles.mockMessage}>{text}</div>;

const Thread: FunctionComponent<IProps> = ({
  width = 'auto',
  post,
  comments,
  sendComment,
  onHide,
  hideCloseBtn
}) => {
  const participants = Array.from(new Set(comments.map(comment => comment.user.id)));
  return (
    <div className={styles.threadContainer} style={{ width }}>
      <header>
        <p className={styles.threadChatName}>
          Thread
        </p>
        <p>
          {'Participants '}
          {participants.length}
        </p>
        {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimes} className={styles.closeBtn} />}
      </header>
      <div>
        <Post post={post} />
      </div>

      <div className={styles.threadComments}>

        <div className={styles.commentsWrapper}>
          {comments.map(comment => createMessage(comment.id, comment.text))}
        </div>

        <TextEditor placeholder="write a comment!" onSend={sendComment} height={130} />
      </div>
    </div>
  );
};

export default Thread;
