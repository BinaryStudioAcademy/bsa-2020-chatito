import { Routine } from 'redux-saga-routines';
import { fetchThreadsRoutine } from '../routines';

interface IThread {
  [key: string]: string;
}

export interface IThreadsState {
  threads: IThread[];
  loading: boolean;
  error: any;
}

const initialState = {
  threads: [],
  loading: false,
  error: ''
};

const ThreadsReducer = (state: IThreadsState = initialState, { type, payload }: Routine<any>) => {
  switch (type) {
    case fetchThreadsRoutine.TRIGGER:
      return {
        ...state, threads: payload, loading: false
      };
    case fetchThreadsRoutine.FAILURE:
      return {
        ...state, loading: false
      };
    case fetchThreadsRoutine.SUCCESS:
      return {
        ...state, loading: false
      };
    default:
      return state;
  }
};

export default ThreadsReducer;
