import React, { FunctionComponent } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'components/Post';
import styles from './styles.module.sass';

import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'common/models/user/IUser';

interface IProps {
  width?: number | string;
  post: IPost;
  comments: IPost[];
  sendComment: IBindingCallback1<string>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
  openUserProfile: IBindingCallback1<IUser>;
}

const Thread: FunctionComponent<IProps> = ({
  width = 'auto',
  post,
  comments,
  sendComment,
  onHide,
  hideCloseBtn,
  openUserProfile
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
      <div className={styles.threadPost}>
        <Post post={post} openUserProfile={openUserProfile} />
      </div>
      <div className={styles.threadComments}>
        <div className={styles.commentsWrapper}>
          {comments.map(comment => (
            <div className={styles.comment}>
              <Post
                key={comment.id}
                post={comment}
                openUserProfile={openUserProfile}
              />
            </div>
          ))}
        </div>
      </div>
      <TextEditor placeholder="write a comment!" onSend={sendComment} height={130} />
    </div>
  );
};

export default Thread;
