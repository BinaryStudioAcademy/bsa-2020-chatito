import React, { FunctionComponent } from 'react';
import TextEditor from 'components/TextEditor';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';

interface IProps {
  width?: number | string;
  post: IPost;
  comments: IPost[];
  sendComment: IBindingCallback1<string>;
}

const createMessage = (id: string, text = '') => <div key={id} className={styles.mockMessage}>{text}</div>;

const Thread: FunctionComponent<IProps> = ({
  width = 'auto',
  post,
  comments,
  sendComment
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
      </header>
      <div>
        {post.text}
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
