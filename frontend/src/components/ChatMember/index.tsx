import React from 'react';
import { IUser } from 'common/models/user/IUser';
import { getUserImgLink } from 'common/helpers/imageHelper';
import styles from './styles.module.sass';

interface IProps {
  user: IUser;
  removeUser: CallableFunction;
  isCreator: boolean;
  currentUser: IUser;
}

const ChatMember = ({
  user,
  removeUser,
  isCreator,
  currentUser
}: IProps) => (
  <div className="mb-2 w-100 d-flex align-items-center position-relative">
    <img className={styles.avatar} src={getUserImgLink(user.imageUrl as string)} alt={user.displayName} />
    <span>{user.id === currentUser.id ? `${user.displayName} (you)` : user.displayName}</span>
    {isCreator && user.id !== currentUser.id
      ? (
        <button
          type="button"
          className={`${styles.removeUser} button-unstyled`}
          onClick={() => removeUser(user.id)}
          onKeyDown={() => removeUser(user.id)}
          tabIndex={0}
        >
          X
        </button>
      )
      : null}
  </div>
);

export default ChatMember;
