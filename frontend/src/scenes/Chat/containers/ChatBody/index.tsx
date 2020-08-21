import React, { useRef, useEffect } from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'containers/Post';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { setActiveThreadRoutine } from 'scenes/Workspace/routines';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';
import { setPostsRoutine } from 'scenes/Chat/routines';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';
import LoaderWrapper from 'components/LoaderWrapper';
import { PostType } from 'common/enums/PostType';

interface IProps {
  chatId: string | undefined;
  messages: IPost[];
  openThread: IBindingCallback1<IPost>;
  activeThreadPostId: string | undefined;
  loadMorePosts: IBindingCallback1<IFetchMorePosts>;
  hasMorePosts: boolean;
  loading: boolean;
  from: number;
  count: number;
}

const ChatBody: React.FC<IProps> = ({
  chatId = '',
  messages,
  openThread,
  activeThreadPostId = '',
  loadMorePosts,
  hasMorePosts,
  loading,
  from,
  count
}) => {
  const chatBody = useRef<HTMLDivElement>(null);

  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };

  useEffect(() => {
    if (chatId && loading) {
      getMorePosts();
    }
    if (chatBody.current !== null && !loading) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }
  }, [loading]);

  const handleOpenThread = (post: IPost) => {
    if (activeThreadPostId === post.id) return;
    openThread(post);
  };

  return (
    <LoaderWrapper
      loading={!chatId.length}
      height="auto"
    >
      <div className={styles.chatBody} key={chatId} ref={chatBody}>
        <InfiniteScroll
          loadMore={getMorePosts}
          isReverse
          initialLoad={false}
          hasMore={hasMorePosts && !loading}
          loader={<Spinner animation="border" role="status" key={0} />}
          useWindow={false}
        >
          {messages.map(m => (
            <Post
              post={m}
              key={m.id}
              openThread={handleOpenThread}
              type={PostType.Post}
            />
          ))}
        </InfiniteScroll>
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => ({
  chatId: state.chat.chat?.id,
  messages: state.chat.posts,
  activeThreadPostId: state.workspace.activeThread?.post.id,
  hasMorePosts: state.chat.hasMorePosts,
  loading: state.chat.loading,
  from: state.chat.fetchFrom,
  count: state.chat.fetchCount
});

const mapDispatchToProps = {
  openThread: setActiveThreadRoutine,
  loadMorePosts: setPostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
