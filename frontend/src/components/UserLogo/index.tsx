import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import Image from 'react-bootstrap/Image';

const UserAvatar: FunctionComponent<IProps> = ({ imgUrl, isOnline }) => (
  <div className={styles.userLogoWrapper}>
    <Image alt="user avatar" src={imgUrl} className={styles.userLogo} roundedCircle />
    <div className={isOnline ? styles.isOnline : styles.isOffline} />
  </div>
);

interface IProps {
  imgUrl: string;
  isOnline: boolean;
}

export default UserAvatar;
