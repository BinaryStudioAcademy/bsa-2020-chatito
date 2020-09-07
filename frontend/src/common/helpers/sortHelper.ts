import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';
import { SortType } from 'common/enums/SortType';

const sortByNewestCreatedAt = (channel1: IBrowserChannel, channel2: IBrowserChannel) => (
  Date.parse(channel2.createdAt) - Date.parse(channel1.createdAt)
);

const sortByOldestCreatedAt = (channel1: IBrowserChannel, channel2: IBrowserChannel) => (
  Date.parse(channel1.createdAt) - Date.parse(channel2.createdAt)
);

const sortByMostMembers = (channel1: IBrowserChannel, channel2: IBrowserChannel) => (
  channel2.users.length - channel1.users.length
);

const sortByFewestMembers = (channel1: IBrowserChannel, channel2: IBrowserChannel) => (
  channel1.users.length - channel2.users.length
);

const sortByAToZName = (channel1: IBrowserChannel, channel2: IBrowserChannel) => {
  const name1 = channel1.name.toLowerCase();
  const name2 = channel2.name.toLowerCase();
  if (name1 < name2) return -1;
  if (name1 > name2) return 1;
  return 0;
};

const sortByZToAName = (channel1: IBrowserChannel, channel2: IBrowserChannel) => {
  const name1 = channel1.name.toLowerCase();
  const name2 = channel2.name.toLowerCase();
  if (name1 > name2) return -1;
  if (name1 < name2) return 1;
  return 0;
};

export const getSortedChannels = (channels: IBrowserChannel[], sortOption: SortType) => {
  switch (sortOption) {
    case SortType.Newest:
      return [...channels].sort(sortByNewestCreatedAt);
    case SortType.Oldest:
      return [...channels].sort(sortByOldestCreatedAt);
    case SortType.Most:
      return [...channels].sort(sortByMostMembers);
    case SortType.Fewest:
      return [...channels].sort(sortByFewestMembers);
    case SortType.AToZ:
      return [...channels].sort(sortByAToZName);
    case SortType.ZToA:
      return [...channels].sort(sortByZToAName);
    default:
      return channels;
  }
};
