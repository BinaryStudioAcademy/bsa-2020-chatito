import React from 'react';
import { Card, Media } from 'react-bootstrap';
import dayjs from 'dayjs';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';
import ProfilePreview from 'components/ProfilePreview/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';

interface IProps {
  post: IPost;
  openThread?: IBindingCallback1<IPost>;
  openUserProfile: IBindingCallback1<IUser>;
}

const Post: React.FC<IProps> = ({ post, openThread, openUserProfile }) => {
  const { user, text, createdAt } = post;
  const onSend = () => {
    console.log('Send text message'); // eslint-disable-line
  };
  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={user} onSend={onSend} openProfile={openUserProfile} />
      <Media.Body bsPrefix={styles.body}>
        <a href="/" className={styles.author}>{user.fullName}</a>
        <br />
        <a href="/" className={styles.metadata}>{dayjs(createdAt).format('hh:mm A')}</a>
        <div className={styles.text}>{text}</div>
        <div className={styles.footer}>
          { openThread && (
            <Card.Link
              bsPrefix={styles.openThreadBtn}
              onClick={() => openThread(post)}
            >
              Reply
            </Card.Link>
          )}
        </div>
      </Media.Body>
    </Media>
  );
};

export default Post;
