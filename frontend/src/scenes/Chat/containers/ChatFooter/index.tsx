import React, { useState, useEffect } from 'react';
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
import { Spinner } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { InputType } from 'common/enums/InputType';
import { IJoinChannel } from 'common/models/chat/IJoinChannel';

interface IProps {
  chatId?: string;
  draftPostId?: string;
  draftPostText?: string;
  isUserChatMember: boolean;
  currentUser: IUser;
  btnLoading: boolean;
  activeInput: InputType.Post | InputType.Comment | null;
  addPost: ({ chatId, text }: ICreatePost) => void;
  upsertDraftPost: IBindingCallback1<IUpsertDraftPost>;
  deleteDraftPost: IBindingCallback1<IDeleteDraftPost>;
  joinChannel: IBindingCallback1<IJoinChannel>;
}

const ChatFooter: React.FC<IProps> = ({
  addPost,
  upsertDraftPost,
  deleteDraftPost,
  joinChannel,
  chatId,
  draftPostId,
  draftPostText,
  isUserChatMember,
  currentUser,
  btnLoading,
  activeInput
}) => {
  const [editorKey, setEditorKey] = useState<any>(null);
  const [inputText, setInputText] = useState<any>(draftPostText);

  useEffect(() => {
    if (activeInput !== InputType.Post) {
      setEditorKey(draftPostText);
    }
  }, [draftPostText]);

  useEffect(() => {
    if (chatId) {
      if (inputText) {
        const payload = {
          id: draftPostId,
          chatId,
          text: inputText
        };
        upsertDraftPost(payload);
      } else if (inputText === '' && draftPostId) {
        deleteDraftPost({ chatId });
      }
    }
  }, [inputText]);

  const onSubmit = (text: string) => {
    if (chatId) addPost({ chatId, text });
    setInputText('');
    return chatId;
  };

  const onJoin = () => {
    joinChannel({ chatId: chatId as string, user: currentUser });
  };

  return (
    <LoaderWrapper loading={!chatId}>
      <div className={styles.chatFooter} key={chatId}>
        {isUserChatMember
          ? (
            <TextEditor
              key={editorKey}
              inputType={InputType.Post}
              placeholder=""
              height="100px"
              draftInput={{ id: draftPostId, text: draftPostText }}
              onSend={onSubmit}
              onInputChange={setInputText}
            />
          )
          : (
            <button className={styles.joinBtn} onClick={onJoin} disabled={btnLoading} type="button">
              <span>Join channel</span>
              {btnLoading && <Spinner animation="border" role="status" size="sm" />}
            </button>
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
    currentUser: state.user.user as IUser,
    btnLoading: state.chat.btnLoading,
    activeInput: state.workspace.activeInput
  };
};

const mapDispatchToProps = {
  addPost: addPostRoutine,
  upsertDraftPost: upsertDraftPostRoutine,
  deleteDraftPost: deleteDraftPostRoutine,
  joinChannel: joinChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);

