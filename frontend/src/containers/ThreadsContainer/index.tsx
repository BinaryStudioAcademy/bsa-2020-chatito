import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IThreadsState } from './reducers/reducer';
import Thread from '../Thread';
import { IThread } from 'common/models/thread/IThread';

interface IProps {
  fetchThreads: () => void;
  loading: boolean;
}

const ThreadsContainer: FunctionComponent<IProps> = ({ fetchThreads, loading }) => {
  const [threads, setThreads] = useState<IThread[]>([]);
  useEffect(() => {
    const fetched = [{ name: 'first', id: '1' }, { name: 'second', id: '2' }];
    // fetchThreads();
    setThreads(fetched);
  }, []);
  return (
    <div className={styles.ThreadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <div className={styles.threadsContainer}>
        {/* {threads.map((thread, index) => (
          <div
            key={thread.id}
            className={styles.thread}
          >
            <Thread
              thread={thread}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IThreadsState) => ({ loading: state.loading });

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
