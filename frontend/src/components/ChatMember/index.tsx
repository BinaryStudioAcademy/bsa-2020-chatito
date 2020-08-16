import React from 'react';
import { IUser } from 'common/models/user/IUser';
import { getUserImgLink } from 'common/helpers/imageHelper';
import styles from './styles.module.sass';

interface IProps {
  user: IUser;
}

const ChatMember = ({
  user
}: IProps) => (
  <div className="mb-1 w-100 d-flex align-items-center">
    <img className={styles.avatar} src={getUserImgLink(user.imageUrl as string)} alt={user.displayName} />
    <span>{user.displayName}</span>
  </div>
);

export default ChatMember;
