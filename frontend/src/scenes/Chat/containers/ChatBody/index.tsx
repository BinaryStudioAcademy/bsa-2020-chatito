import React, { useRef, useEffect, useState, RefObject } from 'react';
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
import CustomReminderModal from 'containers/CustomReminderModal';
import { IUnreadChat } from 'common/models/chat/IUnreadChats';

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
  unreadChats: IUnreadChat[];
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
  unreadChats,
  postId,
  fetchNavigationPost
}) => {
  const [postIdForLine, setPostIdForLine] = useState('');
  const chatBody = useRef<HTMLDivElement>(null);

  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };
  const setNewPostLine = () => {
    unreadChats.forEach(unreadChat => {
      if (unreadChat.id === chatId) {
        if (unreadChat.unreadPosts.length) {
          setPostIdForLine(unreadChat.unreadPosts[0].id);
        } else {
          setPostIdForLine('');
        }
      }
    });
  };
  const scrollToRef = (ref: RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: 'start'
      });
    }
  };

  const postRef = useRef(null);

  useEffect(() => {
    if (chatId && loading) {
      if (postId) {
        fetchNavigationPost({ chatId, from: 0, postId });
      } else {
        getMorePosts();
        setNewPostLine();
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

  const newPostLineElement = (
    <div className={styles.newPostBlock}>
      <div className={styles.line} />
      <span>New</span>
    </div>
  );

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
            <div key={m.id}>
              {postIdForLine === m.id ? newPostLineElement : ''}
              <Post
                post={m}
                postRef={m.id === postId ? postRef : null}
                openThread={handleOpenThread}
                type={PostType.Post}
              />
            </div>
          ))}
          <CustomReminderModal />
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
  count: state.chat.fetchCount,
  unreadChats: state.workspace.unreadChats
});

const mapDispatchToProps = {
  openThread: setActiveThreadRoutine,
  loadMorePosts: setPostsRoutine,
  fetchNavigationPost: fetchNavigationPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
