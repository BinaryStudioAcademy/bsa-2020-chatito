import React from 'react';
import { Card, Media } from 'react-bootstrap';
import dayjs from 'dayjs';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';
import ProfilePreview from 'components/ProfilePreview/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { getUserImgLink } from 'common/helpers/imageHelper';
import { getTextPart } from 'common/helpers/textHelper';

interface IProps {
  post: IPost;
  openThread?: IBindingCallback1<IPost>;
  openUserProfile: IBindingCallback1<IUser>;
}

const Post: React.FC<IProps> = ({ post, openThread, openUserProfile }) => {
  const { createdByUser, text } = post;
  const createdAt = new Date(post.createdAt);
  const onSend = () => {
    console.log('Send text message'); // eslint-disable-line
  };

  const commentList = () => {
    const result = [];
    for (let i = 0; i < Math.min(3, post.comments.length); i += 1) {
      const comment = post.comments[i];
      result.push(
        <div className={styles.commentWrapper}>
          <img
            className={styles.commentImage}
            src={getUserImgLink(comment.user.imageUrl as string)}
            alt={comment.user.fullName}
          />
          <span className={styles.commentUser}>{comment.user.displayName}</span>
          <span>{getTextPart(comment.text, 50)}</span>
        </div>
      );
    }
    const count = post.comments.length - 3;
    if (count > 0) {
      result.push(
        <div className={styles.commentWrapper}>
          <span className={styles.commentUser}>{`And ${count} more comments.`}</span>
        </div>
      );
    }
    return result;
  };

  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={createdByUser} onSend={onSend} openProfile={openUserProfile} />
      <Media.Body bsPrefix={styles.body}>
        <a href="/" className={styles.author}>{createdByUser.fullName}</a>
        <br />
        <div className={styles.status}>{createdByUser.status}</div>
        <br />
        <a href="/" className={styles.metadata}>{dayjs(createdAt).format('DD:MM:YYYY hh:mm A')}</a>
        {/* eslint-disable-next-line */}
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        {openThread && (
          <>
            <div className={styles.footer}>
              <div className={styles.footerKey}>
                <Card.Link
                  bsPrefix={styles.openThreadBtn}
                  onClick={() => openThread(post)}
                >
                  Reply
                </Card.Link>
              </div>
              <div className={styles.footerKey}>
                <Card.Link
                  bsPrefix={styles.openThreadBtn}
                >
                  React
                </Card.Link>
              </div>
              {(post.comments.length > 0) && (
                <div className={styles.footerData}>
                  Last at
                  {' : '}
                  {dayjs(post.comments[0].createdAt).format('DD:MM:YYYY hh:mm A')}
                </div>
              )}
            </div>
            <div>{commentList()}</div>
          </>
        )}
      </Media.Body>
    </Media>
  );
};

export default Post;
