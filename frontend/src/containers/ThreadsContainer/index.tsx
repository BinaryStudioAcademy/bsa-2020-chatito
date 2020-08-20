import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IAppState } from 'common/models/store';
import Thread from 'containers/Thread/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IGetThreads } from 'common/models/threads/IGetThreads';
import LoaderWrapper from 'components/LoaderWrapper/index';
import { IUser } from 'common/models/user/IUser';
import { IFetchedThreads } from 'common/models/threads/IFetchedThreads';
import { ICommentsInfo } from 'common/models/post/ICommentsInfo';

interface IProps {
  fetchThreads: IBindingCallback1<IGetThreads>;
  loading: boolean;
  activeWorkspaceId: string;
  userId: string;
  threads: any;
  openUserProfile: IBindingCallback1<IUser>;
  sending?: boolean;
}

const noInfo: ICommentsInfo = { count: 0, lastAt: new Date(), avatars: [] };

// eslint-disable-next-line
const ThreadsContainer: FunctionComponent<IProps> = ({ fetchThreads, activeWorkspaceId, userId, loading, threads, openUserProfile, sending }) => {
  let fetchedThreads: IFetchedThreads[] = [];
  const hideCloseBtn = true;
  const showOnlyTwoComments = true;
  useEffect(() => {
    if (activeWorkspaceId) {
      fetchThreads({ userId, activeWorkspaceId });
    }
  }, [activeWorkspaceId, sending]);
  if (threads) {
    fetchedThreads = [...threads];
  }
  if (!activeWorkspaceId || loading) {
    return <div className={styles.headerContainer}><LoaderWrapper loading={loading} /></div>;
  }
  if (threads && !threads.length) {
    return (
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>You have no threads yet</p>
      </header>
    );
  }
  return (
    <div className={styles.threadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <div className={styles.threadsContainer}>
        {fetchedThreads.map(post => (
          <div key={post.id}>
            {post.comments.length ? (
              <div
                key={post.id}
                className={styles.thread}
              >
                <Thread
                  showOnlyTwoComments={showOnlyTwoComments}
                  key={post.id}
                  width="100%"
                  post={{
                    createdByUser: post.createdByUser,
                    text: post.text,
                    createdAt: new Date(post.createdAt),
                    id: post.id,
                    chatId: post.chat.id,
                    postReactions: post.postReactions,
                    commentsInfo: noInfo
                  }}
                  comments={post.comments}
                  hideCloseBtn={hideCloseBtn}
                  openUserProfile={openUserProfile}
                />
              </div>
            ) : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  loading: state.threads.loading,
  // eslint-disable-next-line
  userId: state.user.user!.id,
  activeWorkspaceId: state.workspace.workspace.id,
  threads: state.threads.threads,
  sending: state.threads.sendingComment
});

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
