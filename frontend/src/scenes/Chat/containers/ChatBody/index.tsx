import React, { useRef, useEffect, RefObject } from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'containers/Post';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { setActiveThreadRoutine } from 'scenes/Workspace/routines';
import InfiniteScroll from 'react-infinite-scroller';
import { setPostsRoutine, fetchNavigationPostRoutine } from 'scenes/Chat/routines';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';
import LoaderWrapper from 'components/LoaderWrapper';
import { PostType } from 'common/enums/PostType';
import { IFetchNavPost } from 'common/models/post/IFetchNavPost';

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
  postId?: string;
  fetchNavigationPost: IBindingCallback1<IFetchNavPost>;
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
  count,
  postId,
  fetchNavigationPost
}) => {
  const chatBody = useRef<HTMLDivElement>(null);

  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };

  const scrollToRef = (ref: RefObject<HTMLElement>) => {
    ref.current!.scrollIntoView({
      block: 'start'
    });
  };

  const postRef = useRef(null);

  useEffect(() => {
    if (chatId && loading) {
      if (postId) {
        fetchNavigationPost({ chatId, from: 0, postId });
      } else {
        getMorePosts();
      }
    }
    if (chatBody.current !== null && !loading) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }

    if (postRef.current && postId) {
      scrollToRef(postRef);
    }
  }, [loading, chatId]);

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
          useWindow={false}
        >
          {messages.map(m => (
            <Post
              post={m}
              key={m.id}
              postRef={m.id === postId ? postRef : null}
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
  loadMorePosts: setPostsRoutine,
  fetchNavigationPost: fetchNavigationPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
