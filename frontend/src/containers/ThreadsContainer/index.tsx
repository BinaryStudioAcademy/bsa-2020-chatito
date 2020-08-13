import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IAppState } from 'common/models/store';
import Thread from 'containers/Thread/index';
import { IThread } from 'common/models/thread/IThread';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IGetThreads } from 'common/models/threads/IGetThreads';
import LoaderWrapper from 'components/LoaderWrapper/index';
import { exit } from 'process';
import { IUser } from 'common/models/user/IUser';
import { IPost } from 'common/models/post/IPost';
import { IChatName } from 'common/models/threads/IThreadsChatName';
import { IFetchedThreads } from 'common/models/threads/IFetchedThreads';

interface IProps {
  fetchThreads: IBindingCallback1<IGetThreads>;
  loading: boolean;
  activeWorkspaceId: string;
  userId: string;
  threads: any;
}

interface IFilteredThreads {
  id: string;
  createdAt: string;
  text: string;
  chat: IChatName;
  user: IUser;
  comments: IPost[];
}

// interface IProps {
//   width?: number | string;
//   post: IPost;
//   comments: IPost[];
//   sendComment: IBindingCallback1<ICreateComment>;
//   onHide?: IBindingAction;
//   hideCloseBtn?: boolean;
//   openUserProfile: IBindingCallback1<IUser>;
// }

const ThreadsContainer: FunctionComponent<IProps> = ({ fetchThreads, activeWorkspaceId, userId, loading, threads }) => {
  let fetchedThreads: IFetchedThreads[] = [];
  let filteredThreads: IFilteredThreads[] = []; // eslint-disable-line
  useEffect(() => {
    if (activeWorkspaceId) {
      fetchThreads({ userId, activeWorkspaceId });
    }
  }, [activeWorkspaceId]);
  if (threads) {
    fetchedThreads = [...threads];
    console.log(fetchedThreads);
  }
  if (!activeWorkspaceId || !threads) {
    return <LoaderWrapper loading={loading} />;
  }
  return (
    <div className={styles.ThreadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <div className={styles.threadsContainer}>
        {/* {fetchedThreads.map((thread, index) => (
          <div
            key={thread.id}
            className={styles.thread}
          >
            <Thread
              width="100%"
              post=
              comments=
              sendComment={console.log('sendComment')}
              hideCloseBtn={false}
              onHide={console.log('hide')}
              openUserProfile={console.log('open profile')}
            />
          </div>
        ))} */}
        text
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  loading: state.threads.loading,
  userId: state.user.user!.id,
  activeWorkspaceId: state.workspace.workspace.id,
  threads: state.threads.threads });

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
