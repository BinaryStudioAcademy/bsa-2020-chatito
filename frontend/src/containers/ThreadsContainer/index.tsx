import styles from './styles.module.sass';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchThreadsRoutine } from './routines';
import { IAppState } from 'common/models/store';
import Thread from 'containers/Thread/index';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IGetThreads } from 'common/models/threads/IGetThreads';
import LoaderWrapper from 'components/LoaderWrapper/index';
import { IFetchedThreads } from 'common/models/threads/IFetchedThreads';
import { ICommentsInfo } from 'common/models/post/ICommentsInfo';

interface IProps {
  fetchThreads: IBindingCallback1<IGetThreads>;
  loading: boolean;
  activeWorkspaceId: string;
  userId: string;
  threads: any;
}

const noInfo: ICommentsInfo = { count: 0, lastAt: new Date(), avatars: [] };

const ThreadsContainer: FunctionComponent<IProps> = ({ fetchThreads, activeWorkspaceId, userId, loading, threads }) => {
  let fetchedThreads: IFetchedThreads[] = [];
  const hideCloseBtn = true;
  const showOnlyTwoComments = true;
  const changeClassName = true;
  useEffect(() => {
    if (activeWorkspaceId) {
      fetchThreads({ userId, activeWorkspaceId });
    }
  }, [activeWorkspaceId]);
  if (threads) {
    fetchedThreads = [...threads];
  }
  if (threads && !threads.length) {
    return (
      <div className={styles.threadsContainerComponent}>
        <header className={styles.headerContainer}>
          <p className={styles.headerName}>You have no threads yet</p>
        </header>
      </div>
    );
  }
  return (
    <div className={styles.threadsContainerComponent}>
      <header className={styles.headerContainer}>
        <p className={styles.headerName}>Threads</p>
      </header>
      <LoaderWrapper loading={loading}>
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
                      chat: { name: post.chat.name ? post.chat.name : 'Thread' },
                      createdByUser: post.createdByUser,
                      text: post.text,
                      createdAt: new Date(post.createdAt),
                      id: post.id,
                      chatId: post.chat.id,
                      postReactions: post.postReactions,
                      commentsInfo: noInfo,
                      integration: post.integration
                    }}
                    comments={post.comments}
                    hideCloseBtn={hideCloseBtn}
                    classesForThreads={changeClassName}
                  />
                </div>
              ) : ''}
            </div>
          ))}
        </div>
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  loading: state.threads.loading,
  userId: state.user.user ? state.user.user.id : '',
  activeWorkspaceId: state.workspace.workspace.id,
  threads: state.threads.threads
});

const mapDispatchToProps = {
  fetchThreads: fetchThreadsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
