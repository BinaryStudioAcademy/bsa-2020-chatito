import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';

interface IProps{
  userNamesList: string[];
  maxUsersDisplayed?: number;
}

const ParticipantsList: FunctionComponent<IProps> = ({ userNamesList, maxUsersDisplayed = 3 }) => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const listToString = (namesList: string[], maxUsers = 3) => {
    let retString = '';

    namesList.forEach((usName, index) => {
      if (index >= maxUsers) {
        return;
      }

      retString += capitalize(usName);
      retString += index + 1 === maxUsers ? ' ' : ', ';
    });

    if (namesList.length > maxUsers) {
      retString += `and ${namesList.length - maxUsers} others...`;
    }

    return retString;
  };

  return (
    <span className={styles.userList}>
      {listToString(userNamesList, maxUsersDisplayed)}
    </span>
  );
};

export default ParticipantsList;
