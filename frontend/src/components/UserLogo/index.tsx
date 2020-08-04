import styles from './styles.module.scss';
import React from 'react';
import Image from 'react-bootstrap/Image';

const UserAvatar = ({ imgUrl, isOnline }: IComponentProps) => (
  <div className={styles.userLogoWrapper}>
    <Image alt="user avatar" src={imgUrl} className={styles.userLogo} roundedCircle />
    <div className={isOnline ? styles.isOnline : styles.isOffline} />
  </div>
);

interface IComponentProps {
  imgUrl: string;
  isOnline: boolean;
}

export default UserAvatar;
