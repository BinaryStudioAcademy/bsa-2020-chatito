import { IUser } from 'common/models/user/IUser';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';

const searchUsersByEmail = (email: string, users: IUser[]) => (
  users.filter(user => user.email.startsWith(email))
);

const searchUsersByName = (name: string, users: IUser[]) => {
  if (name.includes(' ')) {
    return users.filter(user => (
      user.fullName.toLowerCase().startsWith(name) || user.displayName.toLowerCase().startsWith(name)
    ));
  }
  return users.filter(user => {
    const partialNames = [...user.fullName.split(' '), ...user.displayName.split(' ')];
    return partialNames.find(partialName => partialName.toLowerCase().startsWith(name));
  });
};

export const searchUsers = (str: string, users: IUser[]) => {
  const text = str.toLowerCase().trim();
  if (!text) {
    return [];
  }
  if (text.includes('@')) {
    return searchUsersByEmail(text, users);
  }
  return searchUsersByName(text, users);
};

export const searchChannels = (channels: IBrowserChannel[], value: string) => (
  channels.filter(channel => channel.name.includes(value))
);
