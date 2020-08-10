import React, { FunctionComponent } from 'react';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.sass';
import { IUser } from '../../common/models/user/IUser';
import { getAmPmTimeFromDate } from '../../common/helpers/dateHelper';

interface IProps {
  user: Partial<IUser>;
  text: string;
  sendedAt: Date;
}

const Post: FunctionComponent<IProps> = ({ user, text, sendedAt }) => (
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
      <a href="/" className={styles.metadata}>{getAmPmTimeFromDate(sendedAt)}</a>
      <div className={styles.text}>{text}</div>
    </Media.Body>
  </Media>
);

export default Post;
