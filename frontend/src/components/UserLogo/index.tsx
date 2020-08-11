import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import Image from 'react-bootstrap/Image';

interface IProps {
  imgUrl: string;
  isOnline: boolean;
}

const defaultLogo = 'https://w0.pngwave.com/png/527/663/logo-person-user-person-icon-png-clip-art.png';

const UserLogo: FunctionComponent<IProps> = ({ imgUrl, isOnline }) => (
  <div className={styles.userLogoWrapper}>
    <Image alt="user avatar" src={imgUrl || defaultLogo} className={styles.userLogo} roundedCircle />
    <div className={isOnline ? styles.isOnline : styles.isOffline} />
  </div>
);

export default UserLogo;
