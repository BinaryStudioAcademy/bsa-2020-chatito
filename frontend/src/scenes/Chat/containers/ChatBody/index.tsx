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
import {
  getDate,
  getMonth,
  getYear,
  whenWasSent } from 'common/helpers/dateHelper';
import { usePrevious } from 'common/hooks/usePrevious';

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
  currentUserId: string;
  isUserChatMember: boolean;
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
  fetchNavigationPost,
  currentUserId,
  isUserChatMember
}) => {
  const isNew = true;
  const [postIdForLine, setPostIdForLine] = useState('');
  const chatBody = useRef<HTMLDivElement>(null);
  const [unreadChatPostIds, setUnreadChatPostIds] = useState<string[]>();
  const [copiedPost, setCopiedPost] = useState<string>('');
  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };
  const prevMessagesLength = usePrevious(messages.length);
  const currMessagesLength = messages.length;

  const setNewPostLine = () => {
    unreadChats.forEach(unreadChat => {
      if (unreadChat.id === chatId) {
        if (unreadChat.unreadPosts.length) {
          setPostIdForLine(unreadChat.unreadPosts[0].id);
          const unreadPostIds: string[] = [];
          unreadChat.unreadPosts.forEach(unreadPost => {
            unreadPostIds.push(unreadPost.id);
          });
          setUnreadChatPostIds(unreadPostIds);
        } else {
          setPostIdForLine('');
          setUnreadChatPostIds([]);
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

  const scrollToBottom = () => {
    if (chatBody.current !== null) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
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
    if (!loading) {
      scrollToBottom();
    }
    if (postRef.current && postId) {
      scrollToRef(postRef);
    }
  }, [loading, chatId]);

  useEffect(() => {
    setNewPostLine();
  }, [unreadChats]);

  const isNewMessage = () => prevMessagesLength as number < currMessagesLength;

  const isNewMessageCreatedByCurrentUser = () => (
    messages[currMessagesLength - 1].createdByUser.id === currentUserId
  );

  useEffect(() => {
    if (isNewMessage() && isNewMessageCreatedByCurrentUser()) {
      scrollToBottom();
    }
  }, [prevMessagesLength, currMessagesLength]);

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

  const dateLine = (text: string) => (
    <div className={styles.dateLineBlock}>
      <div className={styles.dateLine} />
      <div className={styles.dateText}>{text}</div>
    </div>
  );

  const pasteDateLine = (index: number) => {
    let text: string | boolean = '';
    if (index === 0 || (getDate(index - 1, messages) && ((
      getDate(index, messages) - getDate(index - 1, messages) > 0
    ) || (
      getMonth(index, messages) - getMonth(index - 1, messages) > 0
    ) || (
      getYear(index, messages) - getYear(index - 1, messages) > 0
    )))) {
      text = whenWasSent(index, messages);
      return dateLine(text);
    }
    return '';
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
          {messages.map((m, index) => (
            <div key={m.id}>
              {pasteDateLine(index)}
              <div className={styles.postContainer}>
                {postIdForLine === m.id ? newPostLineElement : ''}
                <Post
                  // eslint-disable-next-line no-nested-ternary
                  isNew={unreadChatPostIds ? unreadChatPostIds.includes(m.id) ? isNew : !isNew : !isNew}
                  post={m}
                  postRef={m.id === postId ? postRef : null}
                  openThread={handleOpenThread}
                  type={PostType.Post}
                  setCopiedPost={setCopiedPost}
                  copiedPost={copiedPost}
                  isUserChatMember={isUserChatMember}
                />
              </div>
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
  unreadChats: state.workspace.unreadChats,
  currentUserId: state.user.user?.id as string
});

const mapDispatchToProps = {
  openThread: setActiveThreadRoutine,
  loadMorePosts: setPostsRoutine,
  fetchNavigationPost: fetchNavigationPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
