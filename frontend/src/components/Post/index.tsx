import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import dayjs from 'dayjs';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';
import ProfilePreview from 'components/ProfilePreview/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { getUserImgLink } from 'common/helpers/imageHelper';

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
  const { commentsInfo } = post;

  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={createdByUser} onSend={onSend} openProfile={openUserProfile} />
      <Media.Body bsPrefix={styles.body}>
        <a href="#0" className={styles.author}>{createdByUser.fullName}</a>
        <br />
        <div className={styles.status}>{createdByUser.status}</div>
        <br />
        <a href="#0" className={styles.metadata}>{dayjs(createdAt).format('DD:MM:YYYY hh:mm A')}</a>
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
              {commentsInfo.count > 0
                ? (
                  <span className={styles.commentText}>Comments :</span>
                ) : ('')}
              {commentsInfo.avatars.map(avatar => (
                <img
                  className={styles.commentImage}
                  src={getUserImgLink(avatar)}
                  alt={avatar}
                />
              ))}
              {commentsInfo.count > 3
                ? (
                  <span className={styles.commentText}>{`And ${commentsInfo.count - 3} more comments`}</span>
                ) : ('')}
            </div>
          </>
        )}
      </Media.Body>
    </Media>
  );
};

export default Post;
