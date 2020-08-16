import React, { FunctionComponent } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'components/Post';
import styles from './styles.module.sass';
import dayjs from 'dayjs';
import { IPost } from 'common/models/post/IPost';
import { IComment } from 'common/models/post/IComment';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'common/models/user/IUser';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { addCommentRoutine } from './routines';
import { connect } from 'react-redux';
import { getUserImgLink } from 'common/helpers/imageHelper';

interface IProps {
  width?: number | string;
  post: IPost;
  sendComment: IBindingCallback1<ICreateComment>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
  openUserProfile: IBindingCallback1<IUser>;
}

const Thread: FunctionComponent<IProps> = ({
  width = 'auto',
  post,
  sendComment,
  onHide,
  hideCloseBtn,
  openUserProfile
}) => {
  const { comments } = post;
  const participants = Array.from(new Set(comments.map((comment: IComment) => comment.user.id)));
  const sendCommentHandler = (text: string) => {
    const { id: postId } = post;
    sendComment({ postId, text });
  };

  const commentBox = (comment: IComment) => (
    <div className={styles.commentsWrapper}>
      <img
        className={styles.commentImage}
        src={getUserImgLink(comment.user.imageUrl as string)}
        alt={comment.user.fullName}
      />
      <div className={styles.commentData}>
        <span className={styles.commentAuthor}>{comment.user.displayName}</span>
        <br />
        <span className={styles.commentData}>{dayjs(post.comments[0].createdAt).format('DD:MM:YYYY hh:mm A')}</span>
        <br />
        <br />
        <span className={styles.commentText}>{comment.text}</span>
      </div>
    </div>
  );

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
        {comments.map(comment => (commentBox(comment)))}
      </div>
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
