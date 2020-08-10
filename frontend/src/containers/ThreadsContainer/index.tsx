import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IThreadsState } from './reducers/reducer';
import Thread from '../Thread';

interface IThread {
  [key: string]: string;
}

interface IProps {
  fetchThreads: Function;
  loading: boolean;
}

const ThreadsContainer: FunctionComponent<IProps> = ({ fetchThreads, loading }) => {
  const [threads, setThreads]: [IThread[], Function] = useState([]);
  useEffect(() => {
    const fetched = [{ name: 'first', id: '1' }, { name: 'second', id: '2' }];
    // const fetched = props.fetchThreads();
    setThreads(fetched);
  }, []);
  return (
    <div className={styles.ThreadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <div className={styles.threadsContainer}>
        {threads.map((thread, index) => <div className={styles.thread}><Thread thread={thread.name} /></div>)}
      </div>
    </div>
  );
};

const mapStateToProps = (loading: IThreadsState) => (loading);

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
