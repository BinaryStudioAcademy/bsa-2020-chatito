import React from 'react';
import { IUser } from 'common/models/user/IUser';
import { getUserImgLink } from 'common/helpers/imageHelper';
import styles from './styles.module.sass';

interface IProps {
  user: IUser;
  removeUser: CallableFunction;
}

const ChatMember = ({
  user,
  removeUser
}: IProps) => (
  <div className="mb-1 w-100 d-flex align-items-center position-relative">
    <img className={styles.avatar} src={getUserImgLink(user.imageUrl as string)} alt={user.displayName} />
    <span>{user.displayName}</span>
    <span
      className={styles.removeUser}
      role="button"
      onClick={() => removeUser(user.id)}
      onKeyDown={() => removeUser(user.id)}
      tabIndex={0}
    >
      X
    </span>
  </div>
);

export default ChatMember;
