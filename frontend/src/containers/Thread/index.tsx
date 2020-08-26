import React, { FunctionComponent, useState } from 'react';
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

interface IProps {
  showOnlyTwoComments?: boolean;
  width?: number | string;
  post: IPost;
  maxThreadHeight?: number | string;
  comments: Array<IPost>;
  sendComment: IBindingCallback1<ICreateComment>;
  onHide?: IBindingAction;
  hideCloseBtn?: boolean;
  currChatHash: string;
  router: (route: string) => void;
  draftCommentId?: string;
  draftCommentText?: string;
  upsertDraftComment: IBindingCallback1<IUpsertDraftComment>;
  deleteDraftComment: IBindingCallback1<IDeleteDraftComment>;
  isLoading: boolean;
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
  upsertDraftComment,
  deleteDraftComment,
  isLoading
}) => {
  const { whash } = useParams();
  const [showAll, setShowAll] = useState(false);
  const participants = Array.from(new Set(comments.map((comment: IPost) => comment.createdByUser.id)));
  const sendCommentHandler = (text: string) => {
    const { id: postId } = post;
    sendComment({ postId, text });
  };

  const maxComment = showOnlyTwoComments && !showAll ? 2 : 10000;

  const redirectToChat = () => {
    if (whash && post.chat && post.chat?.hash !== currChatHash) {
      router(Routes.Chat
        .replace(':whash', whash)
        .replace(':chash', post.chat.hash || currChatHash));
    }
  };

  return (
    <div className={styles.threadContainer} style={{ width }}>
      <LoaderWrapper loading={isLoading}>
        <header>
          <div className={styles.threadHeaderBlock}>
            {post.chat && post.chat.name
              ? (
                <button type="button" className={styles.threadChatNameButton} onClick={redirectToChat}>
                  {post.chat.name}
                </button>
              )
              : <p className={styles.threadChatName}>Thread</p>}

            <span>{`Participants ${participants.length}`}</span>
          </div>

          {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimesCircle} className={styles.closeBtn} />}
        </header>
        <div className={styles.threadPost}>
          <Post post={post} type={PostType.Post} />
        </div>
        {showOnlyTwoComments
          ? (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className={styles.link}
            >
              Show other replies
            </button>
          ) : ('')}
        <div className={styles.threadComments}>
          {comments.map((comment, index) => (
            index < maxComment
              ? (
                <button type="button" className={styles.threadChatNameButton} onClick={redirectToChat}>
                  {post?.chat?.name}
                </button>
              )
              : null
          ))}
        </div>
        {comments.length > maxComment
          ? (
            <div className={styles.commentsMore}>
              {`And ${comments.length - maxComment} more comments`}
            </div>
          ) : ('')}
        <div className={styles.textEditor}>
          <TextEditor
            key={draftCommentId}
            placeholder="write a comment!"
            height={110}
            draftPayload={{ postId: post.id }}
            draftInput={{
              id: draftCommentId,
              text: draftCommentText
            }}
            upsertDraft={upsertDraftComment}
            deleteDraft={deleteDraftComment}
            onSend={sendCommentHandler}
          />
        </div>
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const draftComments = state.workspace.activeThread?.post.draftComments;

  return {
    // eslint-disable-next-line
    currChatHash: state.chat.chat!.hash,
    draftCommentId: draftComments?.length ? draftComments[0].id : undefined,
    draftCommentText: draftComments?.length ? draftComments[0].text : undefined,
    isLoading: state.workspace.threadLoading
  };
};

const mapDispatchToProps = {
  sendComment: addCommentRoutine,
  upsertDraftComment: upsertDraftCommentRoutine,
  deleteDraftComment: deleteDraftCommentRoutine,
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
