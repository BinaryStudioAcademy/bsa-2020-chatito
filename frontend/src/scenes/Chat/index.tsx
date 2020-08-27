import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import ChatHeader from './containers/ChatHeader';
import ChatBody from './containers/ChatBody';
import ChatFooter from './containers/ChatFooter';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IChat } from 'common/models/chat/IChat';
import { setCurrentChatRoutine } from './routines';
import LoaderWrapper from 'components/LoaderWrapper';
// eslint-disable-next-line
interface IProps {
  isLoading: boolean;
  match: {
    params: {
      whash: string;
      chash: string;
    };
  };
  chats: IChat[];
  selectChat: (chat: IChat) => void;
}
// eslint-disable-next-line
const ChatContainer: React.FC<IProps> = ({ isLoading, match, chats, selectChat }) => {
  useEffect(() => {
    const { chash } = match.params;
    if (chash) {
      const currChat = chats.find(chatItem => chatItem.hash === chash);
      if (currChat) selectChat(currChat);
    }
  }, [isLoading, match.params.chash]);

  return (
    <LoaderWrapper loading={isLoading}>
      <div className={styles.chatContainer}>
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { channels, directMessages } = state.workspace;
  return {
    chat: state.chat.chat,
    isLoading: state.workspace.loading,
    chats: [...channels, ...directMessages] as IChat[]
  };
};

const mapDispatchToProps = {
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
