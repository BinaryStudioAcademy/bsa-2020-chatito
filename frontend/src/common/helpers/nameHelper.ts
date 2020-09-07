import { IUser } from 'common/models/user/IUser';

export const createDirectChannelName = (users: IUser[], currentUser: IUser | undefined) => {
  if (users.length === 1 && currentUser) return [`${currentUser.displayName}`, currentUser.status, '(you)'];
  if (users.length === 2 && currentUser) {
    return [
      users
        .filter(user => user.id !== currentUser.id)
        .map(user => user.displayName)
        .join(', '),
      `${users
        .filter(user => user.id !== currentUser.id)
        .map(user => user.status && user.status)}`
    ];
  }
  if (currentUser) {
    return [users
      .filter(user => user.id !== currentUser.id)
      .map(user => user.displayName)
      .join(', ')];
  }
  return '';
};
