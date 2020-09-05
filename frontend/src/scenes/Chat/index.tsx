import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import ChatHeader from './containers/ChatHeader';
import ChatBody from './containers/ChatBody';
import ChatFooter from './containers/ChatFooter';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IChat } from 'common/models/chat/IChat';
import { setCurrentChatRoutine, fetchPublicChannelRoutine } from './routines';
import LoaderWrapper from 'components/LoaderWrapper';
import { IUser } from 'common/models/user/IUser';
import { ChatType } from 'common/enums/ChatType';

interface IProps {
  isLoading: boolean;
  match: {
    params: {
      whash: string;
      chash: string;
      postId: string;
    };
  };
  chat?: IChat;
  chats: IChat[];
  currentUser: IUser | undefined;
  selectChat: (chat: IChat | null) => void;
  fetchPublicChannel: (chash: string) => void;
}
const ChatContainer: React.FC<IProps> = ({ isLoading, chat, match, chats,
  currentUser, selectChat, fetchPublicChannel }) => {
  useEffect(() => {
    const { chash } = match.params;
    if (chash) {
      const currChat = chats.find(chatItem => chatItem.hash === chash);
      if (currChat) {
        selectChat(currChat);
      } else {
        fetchPublicChannel(chash);
      }
    } else {
      selectChat(null);
    }
  }, [isLoading, match.params.chash, currentUser]);

  return (
    <LoaderWrapper loading={isLoading}>
      <div className={styles.chatContainer}>
        <ChatHeader />
        <ChatBody postId={match?.params?.postId} />
        { chat?.type === ChatType.GithubRepository ? '' : <ChatFooter /> }
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { channels, directMessages, githubRepositories } = state.workspace;
  return {
    chat: state.chat.chat,
    isLoading: state.workspace.loading,
    currentUser: state.user.user,
    chats: [...channels, ...directMessages, ...githubRepositories] as IChat[]
  };
};

const mapDispatchToProps = {
  selectChat: setCurrentChatRoutine,
  fetchPublicChannel: fetchPublicChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
