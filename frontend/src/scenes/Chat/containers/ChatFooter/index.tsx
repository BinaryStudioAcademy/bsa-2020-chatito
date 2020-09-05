import React from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import TextEditor from 'components/TextEditor';
import { addPostRoutine, upsertDraftPostRoutine, deleteDraftPostRoutine, joinChannelRoutine } from '../../routines';
import { IAppState } from 'common/models/store';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IUpsertDraftPost } from 'common/models/draft/IUpsertDraftPost';
import LoaderWrapper from 'components/LoaderWrapper';
import { IDeleteDraftPost } from 'common/models/draft/IDeleteDraftPost';
import { Button, Spinner } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';

interface IProps {
  chatId?: string;
  draftPostId?: string;
  draftPostText?: string;
  isUserChatMember: boolean;
  currentUser: IUser;
  btnLoading: boolean;
  addPost: ({ chatId, text }: ICreatePost) => void;
  upsertDraftPost: IBindingCallback1<IUpsertDraftPost>;
  deleteDraftPost: IBindingCallback1<IDeleteDraftPost>;
  joinChannel: IBindingCallback1<any>;
}

const ChatFooter: React.FC<IProps> = ({
  addPost,
  upsertDraftPost,
  deleteDraftPost,
  chatId,
  draftPostId,
  draftPostText,
  isUserChatMember,
  currentUser,
  joinChannel,
  btnLoading
}) => {
  const onSubmit = (text: string) => {
    if (chatId) addPost({ chatId, text });
    return chatId;
  };

  const onJoin = () => {
    joinChannel({ chatId, user: currentUser });
  };

  return (
    <LoaderWrapper loading={!chatId}>
      <div className={styles.chatFooter} key={chatId}>
        {isUserChatMember
          ? (
            <TextEditor
              key={draftPostText}
              placeholder=""
              draftPayload={{ chatId }}
              height="100px"
              draftInput={{ id: draftPostId, text: draftPostText }}
              onSend={onSubmit}
              upsertDraft={upsertDraftPost}
              deleteDraft={deleteDraftPost}
            />
          )
          : (
            <Button className={styles.joinBtn} onClick={onJoin} disabled={btnLoading}>
              <span>Join channel</span>
              {btnLoading && <Spinner animation="border" role="status" size="sm" />}
            </Button>
          )}
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return {
    chatId: chat ? chat.id : undefined,
    draftPostId: chat?.draftPosts?.length ? chat.draftPosts[0].id : undefined,
    draftPostText: chat?.draftPosts?.length ? chat.draftPosts[0].text : undefined,
    isUserChatMember: !!chat?.users.find(user => user.id === state.user.user?.id),
    currentUser: state.user.user as IUser,
    btnLoading: state.chat.btnLoading
  };
};

const mapDispatchToProps = {
  addPost: addPostRoutine,
  upsertDraftPost: upsertDraftPostRoutine,
  deleteDraftPost: deleteDraftPostRoutine,
  joinChannel: joinChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);

