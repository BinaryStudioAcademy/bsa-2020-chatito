import React from 'react';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.sass';
import { getAmPmTimeFromDate } from 'common/helpers/dateHelper';
import { IPost } from 'common/models/post/IPost';
import ProfilePreview from 'components/ProfilePreview/index';
import { userLogoDefaultUrl } from 'common/configs/defaults';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const { user, text } = post;
  const createdAt = new Date(post.createdAt);

  const onSend = () => {
    console.log('Send text message');
  };
  const testUser = { id: '0', email: '', fullName: 'test', displayName: 'test', userAvatar: userLogoDefaultUrl, status: 'online' }; // eslint-disable-line
  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={testUser} onSend={onSend} />
      <Media.Body>
        <a href="/" className={styles.author}>{user ? user.fullName : ''}</a>
        <a href="/" className={styles.metadata}>{getAmPmTimeFromDate(createdAt)}</a>
        <div className={styles.text}>{text}</div>
      </Media.Body>
    </Media>
  );
};

export default Post;
