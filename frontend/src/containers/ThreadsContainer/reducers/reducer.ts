import { Routine } from 'redux-saga-routines';
import { fetchThreadsRoutine, goToThreadsRoutine } from '../routines';
import { IFetchedThreads } from 'common/models/threads/IFetchedThreads';
import { addCommentRoutine } from 'containers/Thread/routines';

export interface IThreadsState {
  loading: boolean;
  error: string;
  threads?: IFetchedThreads;
  goToThreads?: boolean;
  sendingComment?: false;
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
    case goToThreadsRoutine.SUCCESS:
      return {
        ...state, goToThreads: payload
      };
    case addCommentRoutine.TRIGGER:
      return {
        ...state, sendingComment: true
      };
    case addCommentRoutine.SUCCESS:
      return {
        ...state, sendingComment: false
      };
    case addCommentRoutine.FAILURE:
      return {
        ...state, sendingComment: false
      };
    default:
      return state;
  }
};

export default threadsReducer;
