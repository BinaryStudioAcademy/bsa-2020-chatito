import React from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import TextEditor from 'components/TextEditor';
import { addPostRoutine, upsertDraftPostRoutine } from '../../routines';
import { IAppState } from 'common/models/store';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IUpsertDraftPost } from 'common/models/draft/IUpsertDraftPost';

interface IProps {
  addPost: ({ chatId, text }: ICreatePost) => void;
  chatId?: string;
  draftPost: IDraftPost;
  upsertDraftPost: IBindingCallback1<IUpsertDraftPost>;
}

const ChatFooter: React.FC<IProps> = ({ addPost, upsertDraftPost, chatId, draftPost }) => {
  const onSubmit = (text: string) => {
    if (chatId) addPost({ chatId, text });
    return chatId;
  };

  return (
    <div className={styles.chatFooter} key={chatId}>
      <TextEditor
        placeholder=""
        onSend={onSubmit}
        upsertDraft={upsertDraftPost}
        draftPayload={{ chatId }}
        height="100px"
        draftInput={draftPost}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat, draftPost } = state.chat;
  const chatId = chat ? chat.id : undefined;
  return { chatId, draftPost };
};

const mapDispatchToProps = {
  addPost: addPostRoutine,
  upsertDraftPost: upsertDraftPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);

