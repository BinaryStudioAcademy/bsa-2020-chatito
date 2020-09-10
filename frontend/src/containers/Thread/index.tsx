import React, { FunctionComponent, useState, useEffect } from 'react';
import TextEditor from 'components/TextEditor';
import Post from 'containers/Post';
import { useParams } from 'react-router-dom';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { addCommentRoutine, upsertDraftCommentRoutine, deleteDraftCommentRoutine } from './routines';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { PostType } from 'common/enums/PostType';
import { IUpsertDraftComment } from 'common/models/draft/IUpsertDraftComment';
import { IDeleteDraftComment } from 'common/models/draft/IDeleteDraftComment';
import { IAppState } from 'common/models/store';
import LoaderWrapper from 'components/LoaderWrapper';
import { IUnreadPostComments } from 'common/models/post/IUnreadPostComments';
import { InputType } from 'common/enums/InputType';

interface IProps {
  showOnlyTwoComments?: boolean;
  width?: number | string;
  post: IPost;
  maxThreadHeight?: number | string;
  comments: Array<IPost>;
  sendComment: IBindingCallback1<ICreateComment>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
  currChatHash: string | null;
  router: (route: string) => void;
  draftCommentId?: string;
  draftCommentText?: string;
  classesForThreads?: boolean;
  upsertDraftComment: IBindingCallback1<IUpsertDraftComment>;
  deleteDraftComment: IBindingCallback1<IDeleteDraftComment>;
  isLoading: boolean;
  unreadPostComments: IUnreadPostComments[];
  activeInput: InputType.Post | InputType.Comment | null;
}

const Thread: FunctionComponent<IProps> = ({
  showOnlyTwoComments = false,
  width = 'auto',
  post,
  comments,
  sendComment,
  onHide,
  hideCloseBtn,
  currChatHash,
  router,
  draftCommentId,
  draftCommentText,
  classesForThreads,
  upsertDraftComment,
  deleteDraftComment,
  isLoading,
  unreadPostComments,
  activeInput
}) => {
  const isNew = true;
  const { whash } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [commentIdForLine, setCommentIdForLine] = useState('');
  const [unreadCommentIds, setUnreadCommentIds] = useState<string[]>();
  const [editorKey, setEditorKey] = useState<any>(null);
  const [inputText, setInputText] = useState<any>(draftCommentText);

  const setNewCommentLine = () => {
    unreadPostComments.forEach(unreadPost => {
      if (unreadPost.id === post.id) {
        if (unreadPost.unreadComments.length) {
          setCommentIdForLine(unreadPost.unreadComments[0].id);
          const unreadCommentsIds: string[] = [];
          unreadPost.unreadComments.forEach(unreadComment => {
            unreadCommentsIds.push(unreadComment.id);
          });
          setUnreadCommentIds(unreadCommentsIds);
        } else {
          setCommentIdForLine('');
          setUnreadCommentIds([]);
        }
      }
    });
  };
  useEffect(() => {
    if (post.id) {
      setNewCommentLine();
    }
  }, [post.id, unreadPostComments]);

  useEffect(() => {
    if (activeInput !== InputType.Comment) {
      setEditorKey(draftCommentText);
    }
  }, [draftCommentText]);

  useEffect(() => {
    if (post.id) {
      if (inputText) {
        const payload = {
          id: draftCommentId,
          postId: post.id,
          text: inputText
        };
        upsertDraftComment(payload);
      } else if (inputText === '' && draftCommentId) {
        deleteDraftComment({ postId: post.id });
      }
    }
  }, [inputText]);

  const newCommentLineElement = (
    <div className={styles.newPostBlock}>
      <div className={styles.line} />
      <span>New</span>
    </div>
  );

  const participants = Array.from(new Set(comments.map((comment: IPost) => comment.createdByUser.id)));
  const sendCommentHandler = (text: string) => {
    const { id: postId } = post;
    sendComment({ postId, text });
    setInputText('');
  };

  const maxComment = showOnlyTwoComments && !showAll ? 2 : 10000;

  const redirectToChat = () => {
    if (whash && currChatHash && post.chat && post.chat?.hash !== currChatHash) {
      router(Routes.Chat
        .replace(':whash', whash)
        .replace(':chash', post.chat.hash || currChatHash));
    }
  };
  const threadUnreadMarker = (
    unreadPostComments.map(unreadPost => (
      unreadPost.id === post.id && unreadPost.unreadComments.length ? (
        <span className={styles.new}> New</span>
      ) : (
        ''
      )
    ))
  );

  return (
    <div
      className={classesForThreads ? `${styles.threadsContainerforThreads}
      ${styles.threadContainer}` : styles.threadContainer}
      style={{ width }}
    >
      <LoaderWrapper loading={isLoading} height="100%">
        <header
          className={classesForThreads ? `${styles.threadHeaderForThreads}
          ${styles.threadHeader}` : styles.threadHeader}
        >
          <div className={styles.threadHeaderBlock}>
            {post.chat && post.chat.name
              ? (
                <button type="button" className={styles.threadChatNameButton} onClick={redirectToChat}>
                  <p>
                    {post.chat.name}
                    {threadUnreadMarker}
                  </p>
                </button>
              )
              : (
                <p className={styles.threadChatName}>
                  Thread
                  {threadUnreadMarker}
                </p>
              )}
            <span>{`Participants ${participants.length}`}</span>
          </div>

          {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimesCircle} className={styles.closeBtn} />}
        </header>
        <div className={styles.threadBlock}>
          <div
            className={classesForThreads ? `${styles.threadPostForThreads}
            ${styles.threadPost}` : styles.threadPost}
          >
            <Post post={post} type={PostType.Post} />
          </div>
          {comments.length > maxComment ? (
            <div className={styles.showMoreContainer}>
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className={styles.link}
              >
                {`Show ${comments.length - maxComment} more replies`}
              </button>
            </div>
          ) : (
            ''
          )}
          {comments.map((comment, index) => (
            index < maxComment
              ? (
                <div key={comment.id} className={styles.postContainer}>
                  {commentIdForLine === comment.id ? newCommentLineElement : ''}
                  <Post
                    // eslint-disable-next-line no-nested-ternary
                    isNew={unreadCommentIds ? unreadCommentIds.includes(comment.id) ? isNew : !isNew : !isNew}
                    post={comment}
                    type={PostType.Comment}
                    mainPostId={post.id}
                  />
                </div>
              )
              : null
          ))}
          <div className={styles.textEditor}>
            <TextEditor
              key={editorKey}
              inputType={InputType.Comment}
              placeholder="write a comment!"
              height={100}
              draftInput={{ id: draftCommentId, text: draftCommentText }}
              onSend={sendCommentHandler}
              onInputChange={setInputText}
            />
          </div>
        </div>
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const draftComments = state.workspace.activeThread?.post.draftComments;
  const currChatHash = state.chat.chat ? state.chat.chat.hash : null;
  return {
    currChatHash,
    draftCommentId: draftComments?.length ? draftComments[0].id : undefined,
    draftCommentText: draftComments?.length ? draftComments[0].text : undefined,
    isLoading: state.workspace.threadLoading,
    unreadPostComments: state.workspace.unreadPostComments,
    activeInput: state.workspace.activeInput
  };
};

const mapDispatchToProps = {
  sendComment: addCommentRoutine,
  upsertDraftComment: upsertDraftCommentRoutine,
  deleteDraftComment: deleteDraftCommentRoutine,
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
