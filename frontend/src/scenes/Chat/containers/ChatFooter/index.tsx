import React from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import TextEditor from 'components/TextEditor';
import { addPostRoutine } from '../../routines';
import { IAppState } from 'common/models/store';
import { ICreatePost } from 'common/models/post/ICreatePost';

interface IProps {
  addPost: ({ chatId, text }: ICreatePost) => void;
  chatId?: string;
}

const ChatFooter: React.FC<IProps> = ({ addPost, chatId }) => {
  const onSubmit = (text: string) => {
    console.log('SUBMITTED');

    if (chatId) addPost({ chatId, text });
    return chatId;
  };

  return (
    <div className={styles.chatFooter} key={chatId}>
      <TextEditor
        placeholder=""
        height={120}
        onSend={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  const chatId = chat ? chat.id : undefined;
  return { chatId };
};

const mapDispatchToProps = {
  addPost: addPostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);

