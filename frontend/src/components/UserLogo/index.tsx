import styles from './styles.module.scss';
import React from 'react';

const UserAvatar = ({ imgUrl, isOnline }: IComponentProps) => (
  <div className={styles.userLogoWrapper}>
    <img alt="user avatar" src={imgUrl} className={styles.userLogo} />
    <div className={isOnline ? styles.isOnline : styles.isOffline} />
  </div>
);

interface IComponentProps {
  imgUrl: string;
  isOnline: boolean;
}

export default UserAvatar;
