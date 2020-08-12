import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import Image from 'react-bootstrap/Image';
import { userLogoDefaultUrl } from 'common/configs/defaults';

interface IProps {
  imgUrl: string;
  isOnline: boolean;
}

const UserLogo: FunctionComponent<IProps> = ({ imgUrl, isOnline }) => (
  <div className={styles.userLogoWrapper}>
    <Image alt="avatar" src={imgUrl || userLogoDefaultUrl} className={styles.userLogo} roundedCircle />
    <div className={isOnline ? styles.isOnline : styles.isOffline} />
  </div>
);

export default UserLogo;
