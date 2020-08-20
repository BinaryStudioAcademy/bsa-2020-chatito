import React, { FunctionComponent, useState } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'containers/Post';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { addCommentRoutine } from './routines';
import { connect } from 'react-redux';
import { PostType } from 'common/enums/PostType';

interface IProps {
  showOnlyTwoComments?: boolean;
  chatName?: string;
  width?: number | string;
  post: IPost;
  maxThreadHeight?: number | string;
  comments: Array<IPost>;
  sendComment: IBindingCallback1<ICreateComment>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
}

const Thread: FunctionComponent<IProps> = ({
  showOnlyTwoComments = false,
  chatName = '',
  width = 'auto',
  post,
  comments,
  sendComment,
  onHide,
  hideCloseBtn
}) => {
  const [showAll, setShowAll] = useState(false);
  const participants = Array.from(new Set(comments.map((comment: IPost) => comment.createdByUser.id)));
  const sendCommentHandler = (text: string) => {
    const { id: postId } = post;
    sendComment({ postId, text });
  };

  const maxComment = showOnlyTwoComments && !showAll ? 2 : 10000;

  return (
    <div className={styles.threadContainer} style={{ width }}>
      <header>
        {chatName
          ? <p className={styles.threadChatName}>{chatName}</p>
          : <p className={styles.threadChatName}>Thread</p>}
        <p>
          {'Participants '}
          {participants.length}
        </p>
        {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimes} className={styles.closeBtn} />}
      </header>
      <div className={styles.threadPost}>
        <Post post={post} type={PostType.Post} />
      </div>
      {showOnlyTwoComments
        ? (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className={styles.link}
          >
            Show other replies
          </button>
        ) : ('')}
      <div className={styles.threadComments}>
        {comments.map((comment, index) => (
          index < maxComment
            ? (
              <Post
                key={comment.id}
                post={comment}
                type={PostType.Comment}
              />
            )
            : null
        ))}
      </div>
      {comments.length > maxComment
        ? (
          <div className={styles.commentsMore}>
            {`And ${comments.length - maxComment} more comments`}
          </div>
        ) : ('')}
      <div className={styles.textEditor}>
        <TextEditor placeholder="write a comment!" onSend={sendCommentHandler} height={130} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  sendComment: addCommentRoutine
};

export default connect(null, mapDispatchToProps)(Thread);
