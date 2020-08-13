import React, { FunctionComponent, useState } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'components/Post';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'common/models/user/IUser';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { addCommentRoutine } from './routines';
import { connect } from 'react-redux';

interface IProps {
  showOnlyTwoComments?: boolean;
  chatName?: string;
  width?: number | string;
  post: IPost;
  maxThreadHeight?: number | string;
  comments: IPost[];
  sendComment: IBindingCallback1<ICreateComment>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
  openUserProfile: IBindingCallback1<IUser>;
}

const Thread: FunctionComponent<IProps> = ({
  showOnlyTwoComments = false,
  chatName = '',
  width = 'auto',
  maxThreadHeight = '600px',
  post,
  comments,
  sendComment,
  onHide,
  hideCloseBtn,
  openUserProfile
}) => {
  const [showAll, setShowAll] = useState(false);
  const participants = Array.from(new Set(comments.map(comment => comment.createdByUser.id)));

  const sendCommentHandler = (text: string) => {
    const { id: postId } = post;
    sendComment({ postId, text });
  };
  return (
    <div className={styles.threadContainer} style={{ width }}>
      <header>
        {chatName ? <p className={styles.threadChatName}>{chatName}</p> : 'Thread'}
        <p>
          {'Participants '}
          {participants.length}
        </p>
        {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimes} className={styles.closeBtn} />}
      </header>
      <div className={styles.threadPost}>
        <Post post={post} openUserProfile={openUserProfile} />
      </div>
      <div className={styles.threadComments} style={{ maxHeight: maxThreadHeight }}>
        <div className={styles.commentsWrapper}>
          {showOnlyTwoComments && !showAll ? (
            <div>
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className={styles.link}
              >
                Show other replies
              </button>
              {comments.slice(-2).map(comment => (
                <div className={styles.comment} key={comment.id}>
                  <Post
                    key={comment.id}
                    post={comment}
                    openUserProfile={openUserProfile}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {comments.map(comment => (
                <div className={styles.comment} key={comment.id}>
                  <Post
                    key={comment.id}
                    post={comment}
                    openUserProfile={openUserProfile}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TextEditor placeholder="write a comment!" onSend={sendCommentHandler} height={130} />
    </div>
  );
};

const mapDispatchToProps = {
  sendComment: addCommentRoutine
};

export default connect(null, mapDispatchToProps)(Thread);
