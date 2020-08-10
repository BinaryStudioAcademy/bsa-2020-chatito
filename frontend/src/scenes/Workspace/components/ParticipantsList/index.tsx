import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import { listToString } from '../../../../common/helpers/globalHelpers';
import { IUser } from '../../../../common/models/user/IUser';

interface IProps {
  participants: IUser[];
  maxUsersDisplayed?: number;
}

const getNamesList = (participants: IUser[]) => {
  // MOCK
  participants.map(us => us.fullName);
  return ['yarek1', 'yarek2', 'yarek3', 'yarek4'];
};

const ParticipantsList: FunctionComponent<IProps> = ({ participants, maxUsersDisplayed = 3 }) => (
  <span className={styles.userList}>
    {listToString(getNamesList(participants), maxUsersDisplayed)}
  </span>
);

export default ParticipantsList;
