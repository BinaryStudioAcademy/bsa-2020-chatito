import React, { useRef, useEffect, useState, RefObject } from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'containers/Post';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { setActiveThreadRoutine, readPostRoutine } from 'scenes/Workspace/routines';
import InfiniteScroll from 'react-infinite-scroller';
import {
  setPostsRoutine, fetchNavigationPostRoutine,
  renderScrollDownButtonRoutine, clickToScrollRoutine
} from 'scenes/Chat/routines';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';
import { PostType } from 'common/enums/PostType';
import { IFetchNavPost } from 'common/models/post/IFetchNavPost';
import CustomReminderModal from 'containers/CustomReminderModal';
import { IUnreadChat } from 'common/models/chat/IUnreadChats';
import {
  getDate,
  getMonth,
  getYear,
  whenWasSent
} from 'common/helpers/dateHelper';
import { IPostsToRead } from 'common/models/chat/IPostsToRead';

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
  renderScrollDownButton: IBindingCallback1<boolean>;
  readPost: IBindingCallback1<IPostsToRead>;
  clickedToScroll: boolean;
  clickToScroll: IBindingCallback1<boolean>;
  isUserChatMember: boolean;
  newPostScroll: boolean;
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
  renderScrollDownButton,
  readPost,
  clickedToScroll,
  clickToScroll,
  isUserChatMember,
  newPostScroll
}) => {
  const isNew = true;
  const [postIdForLine, setPostIdForLine] = useState('');
  const chatBody = useRef<HTMLDivElement>(null);
  const [unreadChatPostIds, setUnreadChatPostIds] = useState<string[]>();
  const [copiedPost, setCopiedPost] = useState<string>('');
  const getMorePosts = () => {
    loadMorePosts({ chatId, from, count });
  };

  const needToRenderButton = () => {
    const lastPosts = messages.slice(messages.length - 6);
    const lastPostsIds: string[] = [];
    lastPosts.forEach(lastPost => {
      lastPostsIds.push(lastPost.id);
    });
    if (lastPostsIds.includes(postIdForLine) && postIdForLine) {
      renderScrollDownButton(false);
    } else {
      renderScrollDownButton(true);
    }
  };
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
  useEffect(() => {
    if (messages.length > 6 && postIdForLine) {
      needToRenderButton();
    }
  }, [postIdForLine, messages.length]);
  const scrollToRef = (ref: RefObject<HTMLElement>, behavior?: 'auto' | 'smooth') => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: 'start',
        behavior
      });
    }
  };
  const scrollDown = (behavior?: 'smooth' | 'auto') => {
    if (chatBody.current !== null && !loading) {
      chatBody.current.scrollTo({ left: 0, top: chatBody.current.scrollHeight, behavior });
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
    scrollDown('auto');
  }, [loading, chatId]);

  const isPostLoaded = (id: string) => {
    const tempArr: string[] = [];
    messages.forEach(post => {
      tempArr.push(post.id);
    });
    if (id && !tempArr.includes(id) && !loading) {
      getMorePosts();
      setNewPostLine();
    }
    if (!id || tempArr.includes(id)) {
      scrollToRef(postRef);
    }
  };

  useEffect(() => {
    if (!postId) {
      isPostLoaded(postIdForLine);
    } else if (postRef.current && postId) {
      isPostLoaded(postId);
    }
  }, [messages.length]);

  useEffect(() => {
    setNewPostLine();
  }, [unreadChats]);

  useEffect(() => {
    if (newPostScroll) {
      scrollDown('auto');
    }
  }, [newPostScroll]);

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
  const postsToRead = (id: string) => {
    const postIdToRead = id;
    const unreadChatsCopy = [...unreadChats];
    let postsToDelete: IPost[] = [];
    const postIdsToDelete: string[] = [];
    unreadChatsCopy.forEach((unreadChat, chatIndex) => {
      const unreadPostCopy = unreadChat.unreadPosts;
      unreadChat.unreadPosts.forEach((unreadPost, index) => {
        if (unreadPost.id === postIdToRead) {
          postsToDelete = [...unreadPostCopy.splice(0, index + 1)];
        }
      });
      unreadChatsCopy[chatIndex].unreadPosts = [...unreadPostCopy];
    });
    postsToDelete.forEach(postToDelete => {
      postIdsToDelete.push(postToDelete.id);
    });
    readPost({ postIdsToDelete, unreadChatsCopy });
  };
  const [ableToRender, setAbleToRender] = useState<boolean>(true);
  useEffect(() => {
    if (!clickedToScroll && postIdForLine) {
      renderScrollDownButton(false);
      unreadChats.forEach((unreadChat, index) => {
        if (unreadChat.id === chatId) {
          const postChat = unreadChats[index].unreadPosts;
          if (postChat[postChat.length - 1]) {
            postsToRead(postChat[postChat.length - 1].id);
          }
        }
      });
    }
    scrollDown('smooth');
    setAbleToRender(false);
    setTimeout(() => {
      setAbleToRender(true);
    }, 1000);
    clickToScroll(false);
  }, [clickedToScroll]);

  const needToRenderButtonOnHover = (mId: string) => {
    if (messages.length > 13 && ableToRender) {
      const lastPosts = messages.slice(messages.length - 6);
      const lastBlockedPosts = messages.slice(messages.length - 14);
      const lastPostsIds: string[] = [];
      const lastBlockedPostsIds: string[] = [];
      lastPosts.forEach(lastPost => {
        lastPostsIds.push(lastPost.id);
      });
      if (lastPostsIds.includes(mId) && !postIdForLine) {
        renderScrollDownButton(false);
      }
      lastBlockedPosts.forEach(lastPost => {
        lastBlockedPostsIds.push(lastPost.id);
      });
      if (!lastBlockedPostsIds.includes(mId)) {
        renderScrollDownButton(true);
      }
    }
  };
  return (
    <div className={styles.chatBody} key={chatId} ref={chatBody}>
      <InfiniteScroll
        loadMore={getMorePosts}
        isReverse
        initialLoad={false}
        hasMore={hasMorePosts && !loading}
        useWindow={false}
        id="chatScrollContainer"
      >
        {messages.map((m, index) => (
          <div
            key={m.id}
            ref={m.id === postIdForLine ? postRef : undefined}
            onMouseEnter={() => needToRenderButtonOnHover(m.id)}
          >
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
                hideOptions={!isUserChatMember}
              />
            </div>
          </div>
        ))}
        <CustomReminderModal />
      </InfiniteScroll>
    </div>
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
  clickedToScroll: state.chat.clickedToScroll,
  newPostScroll: state.chat.newPostScroll
});

const mapDispatchToProps = {
  openThread: setActiveThreadRoutine,
  loadMorePosts: setPostsRoutine,
  fetchNavigationPost: fetchNavigationPostRoutine,
  renderScrollDownButton: renderScrollDownButtonRoutine,
  readPost: readPostRoutine,
  clickToScroll: clickToScrollRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
