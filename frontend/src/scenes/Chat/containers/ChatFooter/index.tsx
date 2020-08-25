import React from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import TextEditor from 'components/TextEditor';
import { addPostRoutine, upsertDraftPostRoutine, deleteDraftPostRoutine } from '../../routines';
import { IAppState } from 'common/models/store';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IUpsertDraftPost } from 'common/models/draft/IUpsertDraftPost';
import LoaderWrapper from 'components/LoaderWrapper';
import { IDeleteDraftPost } from 'common/models/draft/IDeleteDraftPost';

interface IProps {
  chatId?: string;
  draftPostId?: string;
  draftPostText?: string;
  addPost: ({ chatId, text }: ICreatePost) => void;
  upsertDraftPost: IBindingCallback1<IUpsertDraftPost>;
  deleteDraftPost: IBindingCallback1<IDeleteDraftPost>;
}

const ChatFooter: React.FC<IProps> = ({
  addPost,
  upsertDraftPost,
  deleteDraftPost,
  chatId,
  draftPostId,
  draftPostText
}) => {
  const onSubmit = (text: string) => {
    if (chatId) addPost({ chatId, text });
    return chatId;
  };

  return (
    <LoaderWrapper loading={!chatId}>
      <div className={styles.chatFooter} key={chatId}>
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
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;

  return {
    chatId: chat ? chat.id : undefined,
    draftPostId: chat?.draftPosts?.length ? chat.draftPosts[0].id : undefined,
    draftPostText: chat?.draftPosts?.length ? chat.draftPosts[0].text : undefined
  };
};

const mapDispatchToProps = {
  addPost: addPostRoutine,
  upsertDraftPost: upsertDraftPostRoutine,
  deleteDraftPost: deleteDraftPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);

