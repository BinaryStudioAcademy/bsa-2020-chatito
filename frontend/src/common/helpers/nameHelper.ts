import { IUser } from 'common/models/user/IUser';

export const createDirectChannelName = (users: IUser[], currentUserId: string) => {
  if (users.length === 1) return `${users[0].displayName} (you)`;

  return users
    .filter(user => user.id !== currentUserId)
    .map(user => user.displayName)
    .join(', ');
};
