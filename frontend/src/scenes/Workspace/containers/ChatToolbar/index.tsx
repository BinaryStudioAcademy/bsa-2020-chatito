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
  faPencilAlt,
  faBookmark,
  faCodeBranch,
  faVolumeMute,
  faCalendarAlt
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
import CreateRepositoryChatModal from 'containers/CreateRepositoryChatModal';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import { env } from 'env';

interface IProps {
  channels: IChat[];
  directMessages: IChat[];
  githubRepositories: IChat[];
  selectedChat: IChat;
  unreadChats: IUnreadChat[];
  selectedWorkspace: IWorkspace;
  currentUser: IUser | undefined;
  unreadPostComments: IUnreadPostComments[];
  isShownCreateRepositoryChat: boolean;
  selectChat: (chat: IChat | null) => void;
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
}

const ChatToolbar: FunctionComponent<IProps> = ({
  channels,
  directMessages,
  githubRepositories,
  selectedChat,
  unreadChats,
  currentUser,
  unreadPostComments,
  isShownCreateRepositoryChat,
  showModal,
  router,
  selectChat,
  selectedWorkspace
}: IProps) => {
  const [chatPanel, setChatPanel] = useState<boolean>(false);
  const [directPanel, setDirectPanel] = useState<boolean>(false);
  const [githubPanel, setGithubPanel] = useState<boolean>(false);
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
    if (location.pathname.includes(chat.hash) && selectedChat && selectedChat.id === chat.id) {
      return `${styles.channelSelect} ${styles.channelCurrent}`;
    }
    return styles.channelSelect;
  };
  const unreadThreadsMarker = () => {
    let unreadThreadsAmount = unreadPostComments.length;
    if (unreadPostComments.length) {
      unreadPostComments.forEach(unreadPostComment => {
        if (!unreadPostComment.unreadComments.length) {
          unreadThreadsAmount -= 1;
        }
      });
    }
    if (unreadThreadsAmount) {
      return (
        <div className={styles.unreadContainer}>
          <div className={styles.unreadCircle}>
            {unreadThreadsAmount < 10 ? (
              <span className={styles.unreadAmount}>{unreadThreadsAmount}</span>
            ) : (
              <span className={`${styles.unreadAmountNineMore} ${styles.unreadAmount}`}>9+</span>
            )}
          </div>
        </div>
      );
    }
    return '';
  };
  const isActiveChanneSelector = (route: Routes) => (
    location.pathname.includes(route.replace(':whash', selectedWorkspace.hash)));

  // eslint-disable-next-line
  const channelSelector = (text: string, iconFa: IconDefinition, onClick = () => { }, isActive = () => false) => (
    <button type="button" className={isActive() ? styles.channelSelectActive : styles.channelSelect} onClick={onClick}>
      <div className={styles.chatBlockContainer}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={iconFa} color="black" />
        </div>
        <div className={styles.channelNameWrapper}>
          <div className={styles.channelNameWrapper}>
            <div className={styles.buttonTextContainer}>
              <span className={styles.buttonText}>{text}</span>
            </div>
          </div>
        </div>
        {text === 'Threads' ? unreadThreadsMarker() : ''}
      </div>
    </button>
  );

  const channelSelectorLink = (text: string, href: string, iconFa: IconDefinition) => (
    <a href={href} type="button" target="_blank" rel="noopener noreferrer" className={styles.channelSelect}>
      <div className={styles.chatBlockContainer}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={iconFa} color="black" />
        </div>
        <div className={styles.channelNameWrapper}>
          <div className={styles.channelNameWrapper}>
            <div className={styles.buttonTextContainer}>
              <span className={styles.buttonText}>{text}</span>
            </div>
          </div>
        </div>
        {text === 'Threads' ? unreadThreadsMarker() : ''}
      </div>
    </a>
  );

  const unreadChatsMarker = (chatId: string) => (
    unreadChats.map(unreadChat => {
      if (unreadChat.id === chatId && unreadChat.unreadPosts.length) {
        return (
          <div className={styles.unreadContainer} key={unreadChat.id}>
            <div className={styles.unreadCircle} key={unreadChat.id}>
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

  const PopoverItem = (data: string) => (
    <Popover id="workspaceItemPopover" className={styles.popOverWindow}>
      <span>
        {data}
      </span>
    </Popover>
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate, id, draftPosts } = channel;
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;

    return (
      <button type="button" key={id} className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <div className={styles.chatBlock}>
          <div className={styles.chatBlockContainer}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} size="xs" />
            </div>
            <OverlayTrigger
              trigger={['hover', 'hover']}
              delay={{ show: 300, hide: 0 }}
              rootClose
              placement="top-start"
              overlay={PopoverItem(name)}
            >
              <div className={styles.channelNameWrapper}>
                <p className={styles.buttonText}>{name}</p>
              </div>
            </OverlayTrigger>
            <div className={styles.markers}>
              {
                draftPostText && !(selectedChat && selectedChat.id === channel.id) ? (
                  <div className={styles.markerContainer}>
                    <FontAwesomeIcon icon={faPencilAlt} color="#2D2D2D" />
                  </div>
                ) : (
                  ''
                )
              }
              {channel.isMuted && (
                <div className={styles.markerContainer}>
                  <FontAwesomeIcon className={styles.muteIcon} icon={faVolumeMute} color="#2D2D2D" />
                </div>
              )}
              {unreadChatsMarker(id)}
            </div>
          </div>
        </div>
      </button>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { users, id, draftPosts } = directMessage;
    const channelNameData = createDirectChannelName(users, currentUser);
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;
    let channelName = '';
    let emoji: string | undefined = '';
    let youMarker = '';
    switch (channelNameData.length) {
      case 1:
        channelName = `${channelNameData[0]}`;
        break;
      case 2:
        channelName = `${channelNameData[0]}`;
        emoji = `${channelNameData[1]?.slice(0, 3).trim()}`;
        break;
      case 3:
        channelName = `${channelNameData[0]}`;
        emoji = channelNameData[1]?.slice(0, 3).trim();
        youMarker = '(you)';
        break;
      default:
        channelName = `${channelNameData}`;
    }
    const status = channelNameData[1] ? channelNameData[1] : '';
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
            <div className={styles.channelNameWrapper}>
              <OverlayTrigger
                trigger={['hover', 'hover']}
                delay={{ show: 300, hide: 0 }}
                rootClose
                placement="top-start"
                overlay={PopoverItem(channelName)}
              >
                <div className={styles.buttonTextContainer}>
                  <p className={styles.buttonText}>{channelName}</p>
                </div>
              </OverlayTrigger>
              {youMarker && (
                <div className={`${styles.markerContainer} ${styles.youMarker}`}>
                  <div className={styles.youMarkerContainer}>
                    <span className={styles.youMarker}>{youMarker}</span>
                  </div>
                </div>
              )}
              {emoji && (
                <div className={styles.markerContainer}>
                  <OverlayTrigger
                    trigger={['hover', 'hover']}
                    delay={{ show: 300, hide: 0 }}
                    rootClose
                    placement="top"
                    overlay={PopoverItem(status)}
                  >
                    <span className={styles.emoji}>{emoji}</span>
                  </OverlayTrigger>
                </div>
              )}
            </div>
            <div className={styles.markers}>
              {
                draftPostText && !(selectedChat && selectedChat.id === directMessage.id) ? (
                  <div className={styles.markerContainer}>
                    <FontAwesomeIcon icon={faPencilAlt} color="#2D2D2D" />
                  </div>
                ) : ''
              }
              {directMessage.isMuted && (
                <div className={styles.markerContainer}>
                  <FontAwesomeIcon className={styles.muteIcon} icon={faVolumeMute} color="#2D2D2D" />
                </div>
              )}
              {unreadChatsMarker(id)}
            </div>
          </div>
        </div>
      </button>
    );
  };

  const githubChannel = (githubRepository: IChat) => {
    const { id, name } = githubRepository;

    return (
      <button
        type="button"
        key={id}
        className={getChannelSelect(githubRepository)}
        onClick={() => doSelectChannel(githubRepository)}
      >
        <div className={styles.chatBlock}>
          <div className={styles.chatBlockContainer}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faCodeBranch} size="xs" />
            </div>
            <span className={styles.buttonText}>{name}</span>
          </div>
        </div>
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

  const addRepositoryButton = () => (
    <button
      type="button"
      className={styles.channelSelect}
      onClick={() => showModal({ modalType: ModalTypes.CreateRepositoryChat, show: true })}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconBorder}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <span className={styles.addButtonText}>
        Add a repository
      </span>
    </button>
  );

  const showInvitePopup = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: true });
  };

  const goToRoute = (route: Routes) => {
    selectChat(null);
    router(route.replace(':whash', selectedWorkspace.hash));
  };

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('Invite to workspace', faUserFriends, showInvitePopup)}
      {channelSelector('Threads', faClipboardList,
        () => goToRoute(Routes.Threads),
        () => isActiveChanneSelector(Routes.Threads))}
      {channelSelector('Mentions & reactions', faAt)}
      {channelSelector('Channel browser', faSearch,
        () => goToRoute(Routes.ChannelBrowser),
        () => isActiveChanneSelector(Routes.ChannelBrowser))}
      {channelSelector('Drafts', faListAlt,
        () => goToRoute(Routes.Drafts),
        () => isActiveChanneSelector(Routes.Drafts))}
      {channelSelector('Saved Items', faBookmark)}
      {channelSelector('File Browser', faDatabase)}
      {channelSelectorLink('My Schedulia', env.urls.scheduliaUrl || '', faCalendarAlt)}
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

      <div className={styles.buttonChannel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setGithubPanel(!githubPanel)}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faCaretRight} className={getClassNameImg(githubPanel)} />
          </div>

          <span className={styles.buttonText}>GitHub</span>
        </button>
      </div>

      <div className={getClassNameDiv(githubPanel)}>
        {githubRepositories.map(githubRepository => (
          githubChannel(githubRepository)))}
        {addRepositoryButton()}
      </div>

      <InvitePopup />
      <CreateChannelModal />
      <CreateDirectModal />
      {isShownCreateRepositoryChat ? <CreateRepositoryChatModal /> : ''}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  channels: state.workspace.channels || [],
  directMessages: state.workspace.directMessages || [],
  githubRepositories: state.workspace.githubRepositories || [],
  selectedWorkspace: state.workspace.workspace,
  isLoading: state.workspace.loading,
  selectedChat: state.chat.chat as IChat,
  unreadChats: state.workspace.unreadChats,
  unreadPostComments: state.workspace.unreadPostComments,
  currentUser: state.user.user,
  isShownCreateRepositoryChat: state.modal.createRepositoryChat
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  router: push,
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
