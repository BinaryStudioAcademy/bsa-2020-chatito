import styles from './styles.module.scss';
import React from 'react';
import IUser from '../../common/models/IUser';

const UserPopUp = ({ isShown, user }: IPropsType) => (
  <div className={isShown ? styles.isShown : styles.isHidden}>
    <img className={styles.userAvatarBig} src={user.imgUrl} alt="User avatar big" />

    <div>
      <p className={styles.usernameHeader}>{user.name}</p>
      <p>Some info</p>
      <p>Some othe info</p>
    </div>
  </div>
);

interface IPropsType {
  isShown: boolean;
  user: IUser;
}

export default UserPopUp;
