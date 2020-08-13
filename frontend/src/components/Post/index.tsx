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
  const { createdByUser, text } = post;
  const createdAt = new Date(post.createdAt);

  const onSend = () => {
    console.log('Send text message');
  };
  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={createdByUser} onSend={onSend} />
      <Media.Body>
        <a href="/" className={styles.author}>{createdByUser.displayName}</a>
        <a href="/" className={styles.metadata}>{getAmPmTimeFromDate(createdAt)}</a>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      </Media.Body>
    </Media>
  );
};

export default Post;
