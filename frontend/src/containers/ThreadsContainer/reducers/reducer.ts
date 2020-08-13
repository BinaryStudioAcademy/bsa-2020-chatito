import { Routine } from 'redux-saga-routines';
import { fetchThreadsRoutine } from '../routines';
import { IThread } from 'common/models/thread/IThread';
import { IFetchedThreads } from 'common/models/threads/IFetchedThreads';

export interface IThreadsState {
  loading: boolean;
  error: string;
  threads?: IFetchedThreads;
}

const initialState = {
  loading: false,
  error: ''
};

const threadsReducer = (state: IThreadsState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case fetchThreadsRoutine.TRIGGER:
      return {
        ...state, loading: true
      };
    case fetchThreadsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchThreadsRoutine.SUCCESS:
      return {
        ...state, loading: false, threads: payload
      };
    default:
      return state;
  }
};

export default threadsReducer;
