import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'containers/Post';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { setActiveThreadRoutine } from 'scenes/Workspace/routines';
import InfiniteScroll from 'react-infinite-scroller';
import { setPostsRoutine } from 'scenes/Chat/routines';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';
import LoaderWrapper from 'components/LoaderWrapper';
import { PostType } from 'common/enums/PostType';
import CustomReminderModal from 'containers/CustomReminderModal';
import { IUnreadChat } from 'common/models/chat/IUnreadChats';
import { divide } from 'ramda';

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
  unreadChats
}) => {
  const [postIdForLine, setPostIdForLine] = useState('');
  const chatBody = useRef<HTMLDivElement>(null);

  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };

  const newMessageLine = () => {
    unreadChats.forEach(unreadChat => {
      if (unreadChat.unreadPosts.length) {
        if (unreadChat.id === chatId && unreadChat.unreadPosts[0]) {
          setPostIdForLine(unreadChat.unreadPosts[0].id);
        }
      } else {
        setPostIdForLine('');
      }
    });
  };

  useEffect(() => {
    if (chatId) {
      getMorePosts();
      newMessageLine();
    }
    if (chatBody.current !== null && !loading) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }
  }, [loading, chatId]);

  const handleOpenThread = (post: IPost) => {
    if (activeThreadPostId === post.id) return;
    openThread(post);
  };

  // const newPostLine = (postId: string) => {
  //   const line = <div>New</div>;
  //   let show = false;
  //   if (unreadChats.length) {
  //     unreadChats.forEach(unreadChat => {
  //       if (unreadChat.id === chatId) {
  //         unreadChat.unreadPosts.forEach((unreadPost, index) => {
  //           if (unreadPost.id === postId && index === 0) {
  //             show = true;
  //           }
  //         });
  //       }
  //     });
  //   }
  //   return show ? line : '';
  // };

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
            <>
              {/* {newPostLine(m.id)} */}
              {postIdForLine === m.id ? <div>New</div> : ''}
              <Post
                post={m}
                key={m.id}
                openThread={handleOpenThread}
                type={PostType.Post}
              />
            </>
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
  loadMorePosts: setPostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
