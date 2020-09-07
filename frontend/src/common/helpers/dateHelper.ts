import { IPost } from 'common/models/post/IPost';

export const getDate = (index: number, messages: IPost[]) => new Date(messages[index].createdAt).getDate();

export const getDay = (index: number, messages: IPost[]) => new Date(messages[index].createdAt).getDay();
export const getMonth = (index: number, messages: IPost[]) => new Date(messages[index].createdAt).getMonth();
export const getYear = (index: number, messages: IPost[]) => new Date(messages[index].createdAt).getFullYear();

export const getDateToPaste = (index: number, messages: IPost[]) => (
  new Date(messages[index].createdAt).toString().slice(4, 15));

export const whenWasSent = (index: number, messages: IPost[]) => {
  const todayDay = new Date().getDay();
  const todayMounth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const recievedDay = getDay(index, messages);
  const recievedMonth = getMonth(index, messages);
  const recievedYear = getYear(index, messages);
  if (todayDay - recievedDay === 1 && todayMounth === recievedMonth && todayYear === recievedYear) {
    return 'yesterday';
  }
  if (todayDay === recievedDay && todayMounth === recievedMonth && todayYear === recievedYear) {
    return 'today';
  }
  return getDateToPaste(index, messages);
};
