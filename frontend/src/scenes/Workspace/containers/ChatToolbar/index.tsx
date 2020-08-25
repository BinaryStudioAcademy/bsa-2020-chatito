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
  faPlay,
  faPlus,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import styles from './styles.module.sass';
import { goToThreadsRoutine } from 'containers/ThreadsContainer/routines';
import { Routine } from 'redux-saga-routines';
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

interface IProps {
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
  selectedWorkspace: IWorkspace;
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
  goToThreads: Routine;
}

const ChatToolbar: FunctionComponent<IProps> = ({
  channels,
  directMessages,
  selectedChat,
  showModal,
  router,
  selectedWorkspace
}: IProps) => {
  const [chatPanel, setChatPanel] = useState<boolean>(false);
  const [directPanel, setDirectPanel] = useState<boolean>(false);

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

  // eslint-disable-next-line
  const channelSelector = (text: string, iconFa: IconDefinition, onClick = () => { }) => (
    <button type="button" className={styles.channelSelect} onClick={onClick}>
      <FontAwesomeIcon icon={iconFa} color="black" />
      <span className={styles.buttonText}>{text}</span>
    </button>
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate, id, draftPosts } = channel;
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;

    return (
      <button type="button" key={id} className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <div className={styles.chatBlock}>
          <div>
            <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} color="black" />
            <span className={styles.buttonText}>{name}</span>
          </div>

          {
            draftPostText && !(selectedChat && selectedChat.id === channel.id)
              ? <FontAwesomeIcon icon={faPencilAlt} color="black" />
              : null
          }

        </div>
      </button>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { name, id, draftPosts } = directMessage;
    const draftPostText = draftPosts?.length ? draftPosts[0].text : undefined;

    return (
      <button
        type="button"
        key={id}
        className={getChannelSelect(directMessage)}
        onClick={() => doSelectChannel(directMessage)}
      >
        <div className={styles.chatBlock}>
          <div>
            <div className={styles.metkaOnLine} />
            <span className={styles.buttonText}>{name}</span>
          </div>

          {
            draftPostText && !(selectedChat && selectedChat.id === directMessage.id)
              ? <FontAwesomeIcon icon={faPencilAlt} color="black" />
              : null
          }

        </div>
      </button>
    );
  };

  const addChannelButton = () => (
    <a
      href="#0"
      className={styles.channelSelect}
      onClick={() => showModal({ modalType: ModalTypes.CreateChannel, show: true })}
    >
      <div className={styles.iconBorder}>
        <FontAwesomeIcon icon={faPlus} color="red" />
      </div>
      <span className={styles.buttonText}>
        Add a channel
      </span>
    </a>
  );

  const addDirectButton = () => (
    <a
      href="#0"
      className={styles.channelSelect}
      onClick={() => showModal({ modalType: ModalTypes.CreateDirect, show: true })}
    >
      <div className={styles.iconBorder}>
        <FontAwesomeIcon icon={faPlus} color="red" />
      </div>
      <span className={styles.buttonText}>
        Add a direct
      </span>
    </a>
  );

  const showInvitePopup = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: true });
  };

  const goToThreadsCallBack = () => router(Routes.Threads.replace(':whash', selectedWorkspace.hash));

  const goToDraftsCallBack = () => router(Routes.Drafts.replace(':whash', selectedWorkspace.hash));

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('Invite to workspace', faUserFriends, showInvitePopup)}
      {channelSelector('Threads', faClipboardList, goToThreadsCallBack)}
      {channelSelector('Mentions & reactions', faAt)}
      {channelSelector('Drafts', faListAlt, goToDraftsCallBack)}
      {channelSelector('Saved Items', faSearch)}
      {channelSelector('File Browser', faDatabase)}
      <hr className={styles.hrr} />
      <div className={styles.buttonChanel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setChatPanel(!chatPanel)}>
          <FontAwesomeIcon icon={faPlay} className={getClassNameImg(chatPanel)} />
          <span className={styles.buttonText}>Channels</span>
        </button>
      </div>
      <div className={getClassNameDiv(chatPanel)}>
        {channels.map(channel => (
          userChannel(channel)))}
        {addChannelButton()}
      </div>
      <hr className={styles.hrr} />
      <div className={styles.buttonChanel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setDirectPanel(!directPanel)}>
          <FontAwesomeIcon icon={faPlay} className={getClassNameImg(directPanel)} />
          <span className={styles.buttonText}>Direct Messages</span>
        </button>
      </div>
      <div className={getClassNameDiv(directPanel)}>
        {directMessages.map(directMessage => (
          directChannel(directMessage)))}
        {addDirectButton()}
      </div>
      <hr className={styles.hrr} />
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
  selectedChat: state.chat.chat! // eslint-disable-line
});

const mapDispatchToProps = {
  goToThreads: goToThreadsRoutine,
  showModal: showModalRoutine,
  router: push,
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
