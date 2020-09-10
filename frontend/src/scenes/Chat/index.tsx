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
import { ChatType } from 'common/enums/ChatType';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IFetchPublicChannel } from 'common/models/chat/IFetchPublicChannel';

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
  isUserChatMember: boolean;
  selectChat: (chat: IChat | null) => void;
  fetchPublicChannel: IBindingCallback1<IFetchPublicChannel>;
}
const ChatContainer: React.FC<IProps> = ({ isLoading, chat, match, chats,
  selectChat, fetchPublicChannel, isUserChatMember }) => {
  useEffect(() => {
    if (!isLoading) {
      const { chash } = match.params;
      if (chash) {
        const currChat = chats.find(chatItem => chatItem.hash === chash);
        if (currChat) {
          selectChat(currChat);
        } else {
          fetchPublicChannel({ chash, whash: match.params.whash });
        }
      } else {
        selectChat(null);
      }
    }
  }, [isLoading, match.params.chash]);
  return (
    <LoaderWrapper loading={isLoading}>
      <div className={styles.chatContainer}>
        <ChatHeader isUserChatMember={isUserChatMember} />
        <ChatBody postId={match?.params?.postId} isUserChatMember={isUserChatMember} />
        { chat?.type === ChatType.GithubRepository ? '' : <ChatFooter isUserChatMember={isUserChatMember} /> }
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { channels, directMessages, githubRepositories } = state.workspace;
  return {
    chat: state.chat.chat,
    isLoading: state.workspace.loading,
    chats: [...channels, ...directMessages, ...githubRepositories] as IChat[],
    isUserChatMember: !!state.chat.chat?.users.find(user => user.id === state.user.user?.id)
  };
};

const mapDispatchToProps = {
  selectChat: setCurrentChatRoutine,
  fetchPublicChannel: fetchPublicChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
