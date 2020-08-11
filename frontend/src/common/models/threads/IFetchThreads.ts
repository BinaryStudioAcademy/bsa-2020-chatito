import { IThread } from 'common/models/thread/IThread';

export type IFetchThreads = () => IThread[];
export type ISetThreads<T> = (arg: T) => void;
