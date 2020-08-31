import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faUserFriends,
  faListAlt,
  faClipboardList,
  faLock,
  faHashtag,
  faAt,
  faSearch,
  faDatabase,
  faCaretRight,
  faPlus,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import styles from './styles.module.sass';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import InvitePopup from 'containers/InvitePopup';
import CreateChannelModal from 'containers/CreateChannelModal';
import CreateDirectModal from 'containers/CreateDirectModal';
import { push } from 'connected-react-router';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { Routes } from 'common/enums/Routes';
import { setCurrentChatRoutine } from 'scenes/Chat/routines';
import { useLocation } from 'react-router-dom';
import { createDirectChannelName } from 'common/helpers/nameHelper';
import { IUnreadChat } from 'common/models/chat/IUnreadChats';
import { IUnreadPostComments } from 'common/models/post/IUnreadPostComments';

interface IProps {
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
  unreadChats: IUnreadChat[];
  selectedWorkspace: IWorkspace;
  currentUserId: string;
  unreadPostComments: IUnreadPostComments[];
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
}

const ChatToolbar: FunctionComponent<IProps> = ({
  channels,
  directMessages,
  selectedChat,
  unreadChats,
  currentUserId,
  unreadPostComments,
  showModal,
  router,
  selectedWorkspace
}: IProps) => {
  const [chatPanel, setChatPanel] = useState<boolean>(false);
  const [directPanel, setDirectPanel] = useState<boolean>(false);
  const location = useLocation();
  const doSelectChannel = (chat: IChat) => {
    if (selectedWorkspace && chat) {
      router(Routes.Chat.replace(':whash', selectedWorkspace.hash)
        .replace(':chash', chat.hash));
    } else if (selectedWorkspace) {
      router(Routes.Workspace.replace(':whash', selectedWorkspace.hash));
    } else {
      router(Routes.AddWorkspace);
    }
  };

  const getClassNameDiv = (state: boolean) => (state ? styles.listBoxHidden : styles.listBox);

  const getClassNameImg = (state: boolean) => (state ? styles.chanelsImgRotate : styles.chanelsImg);

  const getChannelSelect = (chat: IChat) => {
    if (selectedChat && selectedChat.id === chat.id) {
      return `${styles.channelSelect} ${styles.channelCurrent}`;
    }
    return styles.channelSelect;
  };
  const unreadThreadsMarker = () => {
    let unreadThreadsStatus = false;
    if (unreadPostComments.length) {
      unreadPostComments.forEach(unreadPost => {
        if (unreadPost.unreadComments.length) {
          unreadThreadsStatus = true;
        }
      });
      if (unreadThreadsStatus) {
        return (
          <div className={styles.unreadContainer}>
            <div className={styles.unreadCircle} />
          </div>
        );
      }
    }
    return '';
  };
  // eslint-disable-next-line
  const isActiveChanneSelector = (route: Routes) => location.pathname.includes(route.replace(':whash', selectedWorkspace.hash));

  // eslint-disable-next-line
  const channelSelector = (text: string, iconFa: IconDefinition, onClick = () => { }, isActive = () => false) => (
    <button type="button" className={isActive() ? styles.channelSelectActive : styles.channelSelect} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={iconFa} color="black" />
      </div>
      <span className={styles.buttonText}>{text}</span>
      {text === 'Threads' ? unreadThreadsMarker() : ''}
    </button>
  );

  const unreadChatsMarker = (chatId: string) => (
    unreadChats.map(unreadChat => {
      if (unreadChat.id === chatId && unreadChat.unreadPosts.length) {
        return (
          <div className={styles.unreadContainer} key={unreadChat.id}>
            <div className={styles.unreadCircle}>
              {unreadChat.unreadPosts.length < 10 ? (
                <span className={styles.unreadAmount}>{unreadChat.unreadPosts.length}</span>
              ) : (
                <span className={`${styles.unreadAmountNineMore} ${styles.unreadAmount}`}>9+</span>
              )}
            </div>
          </div>
        );
      }
      return '';
    })
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate, id, draftPosts } = channel;
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;

    return (
      <button type="button" key={id} className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} size="xs" />
        </div>
        <div className={styles.chatBlock}>
          <span className={styles.buttonText}>{name}</span>

          {
            draftPostText && !(selectedChat && selectedChat.id === channel.id)
              ? <FontAwesomeIcon icon={faPencilAlt} size="xs" />
              : null
          }
        </div>
        {unreadChatsMarker(id)}
      </button>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { users, id, draftPosts } = directMessage;
    const channelName = createDirectChannelName(users, currentUserId);
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;

    return (
      <button
        type="button"
        key={id}
        className={getChannelSelect(directMessage)}
        onClick={() => doSelectChannel(directMessage)}
      >
        <div className={styles.chatBlock}>
          <div className={styles.chatBlockContainer}>
            <div className={styles.iconWrapper}>
              <div className={styles.onlineSign} />
            </div>
            <span className={styles.buttonText}>{channelName}</span>
          </div>
          {
            draftPostText && !(selectedChat && selectedChat.id === directMessage.id)
              ? <FontAwesomeIcon icon={faPencilAlt} color="black" />
              : null
          }
        </div>
        {unreadChatsMarker(id)}
      </button>
    );
  };

  const addChannelButton = () => (
    <button
      type="button"
      className={styles.channelSelect}
      onClick={() => showModal({ modalType: ModalTypes.CreateChannel, show: true })}
    >

      <div className={styles.iconWrapper}>
        <div className={styles.iconBorder}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <span className={styles.addButtonText}>
        Add a channel
      </span>
    </button>
  );

  const addDirectButton = () => (
    <button
      type="button"
      className={styles.channelSelect}
      onClick={() => showModal({ modalType: ModalTypes.CreateDirect, show: true })}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconBorder}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <span className={styles.addButtonText}>
        Add a direct
      </span>
    </button>
  );

  const showInvitePopup = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: true });
  };

  const goToRoute = (route: Routes) => router(route.replace(':whash', selectedWorkspace.hash));

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('Invite to workspace', faUserFriends, showInvitePopup)}
      {channelSelector('Threads', faClipboardList,
        () => goToRoute(Routes.Threads),
        () => isActiveChanneSelector(Routes.Threads))}
      {channelSelector('Mentions & reactions', faAt)}
      {channelSelector('Drafts', faListAlt,
        () => goToRoute(Routes.Drafts),
        () => isActiveChanneSelector(Routes.Drafts))}
      {channelSelector('Saved Items', faSearch)}
      {channelSelector('File Browser', faDatabase)}

      <div className={styles.buttonChannel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setChatPanel(!chatPanel)}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faCaretRight} className={getClassNameImg(chatPanel)} />
          </div>

          <span className={styles.buttonText}>Channels</span>
        </button>
      </div>

      <div className={getClassNameDiv(chatPanel)}>
        {channels.map(channel => (
          userChannel(channel)))}
        {addChannelButton()}
      </div>

      <div className={styles.buttonChannel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setDirectPanel(!directPanel)}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faCaretRight} className={getClassNameImg(directPanel)} />
          </div>

          <span className={styles.buttonText}>Direct Messages</span>
        </button>
      </div>

      <div className={getClassNameDiv(directPanel)}>
        {directMessages.map(directMessage => (
          directChannel(directMessage)))}
        {addDirectButton()}
      </div>

      <InvitePopup />
      <CreateChannelModal />
      <CreateDirectModal />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  channels: state.workspace.channels || [],
  directMessages: state.workspace.directMessages || [],
  selectedWorkspace: state.workspace.workspace,
  isLoading: state.workspace.loading,
  selectedChat: state.chat.chat as IChat,
  unreadChats: state.workspace.unreadChats,
  unreadPostComments: state.workspace.unreadPostComments
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  router: push,
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
