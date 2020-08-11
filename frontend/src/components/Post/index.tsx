import React from 'react';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.sass';
import { getAmPmTimeFromDate } from 'common/helpers/dateHelper';
import { IPost } from 'common/models/post/IPost';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const { user, text, createdAt } = post;

  return (
    <Media className={styles.postWrapper}>
      <img
        width={64}
        height={64}
        className="mr-3 rounded"
        src={user.imageUrl ? user.imageUrl : "https://my.throtl.com/assets/icons/user-default-gray"}
        alt={user.fullName}
      />
      <Media.Body>
        <a href="/" className={styles.author}>{user.fullName}</a>
        <a href="/" className={styles.metadata}>{getAmPmTimeFromDate(createdAt)}</a>
        <div className={styles.text}>{text}</div>
      </Media.Body>
    </Media>
  )
};

export default Post;
