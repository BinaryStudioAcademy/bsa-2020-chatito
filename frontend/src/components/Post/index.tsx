import React from 'react';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.sass';
import { getAmPmTimeFromDate } from 'common/helpers/dateHelper';
import { IPost } from 'common/models/post/IPost';
import ProfilePreview from 'components/ProfilePreview/index';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const { user, text, createdAt } = post;
  const onSend = () => {
    console.log('Send text message');
  };
  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={user} onSend={onSend} />
      <Media.Body>
        <a href="/" className={styles.author}>{user.fullName}</a>
        <a href="/" className={styles.metadata}>{getAmPmTimeFromDate(new Date(createdAt))}</a>
        <div className={styles.text}>{text}</div>
      </Media.Body>
    </Media>
  );
};

export default Post;
