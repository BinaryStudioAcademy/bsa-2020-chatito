import React from 'react';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.sass';
import { getAmPmTimeFromDate } from 'common/helpers/dateHelper';
import { IPost } from 'common/models/post/IPost';
import ProfilePreview from 'components/ProfilePreview/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  post: IPost;
  openProfile: IBindingAction;
  openThread?: IBindingCallback1<IPost>;
}

const Post: React.FC<IProps> = ({ post, openProfile, openThread }) => {
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
        <button type="button" onClick={openProfile}>Show profile</button>
        { openThread && <button type="button" onClick={() => openThread(post)}>Show thread</button>}
      </Media.Body>
    </Media>
  );
};

export default Post;
