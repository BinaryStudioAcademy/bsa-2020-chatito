import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IThreadsState } from './reducers/reducer';
import Thread from '../Thread';
import { IThread } from 'common/models/thread/IThread';

export type IFetchThreads = () => IThread[];
export type ISetThreads<T> = (arg: T) => void;
interface IProps {
  // fetchThreads: IFetchThreads;
  loading: boolean;
}

const ThreadsContainer: FunctionComponent<IProps> = ({ loading }) => {
  const [threads, setThreads]:[IThread[], ISetThreads<IThread[]>] = useState<IThread[]>([]);
  useEffect(() => {
    const fetched = [{ name: 'first', id: '1' }, { name: 'second', id: '2' }];
    // const fetched = fetchThreads();
    setThreads(fetched);
  }, []);
  return (
    <div className={styles.ThreadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <div className={styles.threadsContainer}>
        {/* {threads.map((thread, index) => <div className={styles.thread}><Thread thread={thread.name} /></div>)} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IThreadsState) => ({ loading: state.loading});

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
