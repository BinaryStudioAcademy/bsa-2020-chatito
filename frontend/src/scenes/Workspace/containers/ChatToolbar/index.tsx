import React, { useState, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
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
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import styles from './styles.module.sass';
import { goToThreadsRoutine } from 'containers/ThreadsContainer/routines';
import { setCurrentChatRoutine } from 'scenes/Chat/routines';
import { fetchUserChatsRoutine } from '../../routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import InvitePopup from 'containers/InvitePopup';
import CreateChannelModal from 'containers/CreateChannelModal';
import CreateDirectModal from 'containers/CreateDirectModal';

interface IProps {
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
  selectChat: Routine;
  fetchChats: IBindingAction;
  showModal: IBindingCallback1<IModalRoutine>;
  goToThreads: Routine;
}

const ChatToolbar: FunctionComponent<IProps> = ({
  channels,
  directMessages,
  selectedChat,
  selectChat,
  fetchChats,
  showModal,
  goToThreads
}: IProps) => {
  const [chatPanel, setChatPanel] = useState<boolean>(false);
  const [directPanel, setDirectPanel] = useState<boolean>(false);

  const doSelectChannel = (channel: IChat) => {
    selectChat(channel);
    goToThreads(false);
  };

  const getClassNameDiv = (state: boolean) => (state ? styles.listBoxHidden : styles.listBox);

  const getClassNameImg = (state: boolean) => (state ? styles.chanelsImgRotate : styles.chanelsImg);

  useEffect(() => {
    fetchChats();
  }, []);

  const getChannelSelect = (chat: IChat) => {
    if (selectedChat && selectedChat.id === chat.id) {
      return `${styles.channelSelect} ${styles.channelCurrent}`;
    }
    return styles.channelSelect;
  };

  // eslint-disable-next-line
  const channelSelector = (text: string, iconFa: IconDefinition, onClick = () => { }) => (
    <a href="#0" className={styles.channelSelect} onClick={onClick}>
      <FontAwesomeIcon icon={iconFa} color="black" />
      <span className={styles.buttonText}>{text}</span>
    </a>
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate, id } = channel;
    return (
      <a href="#0" key={id} className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} color="black" />
        <span className={styles.buttonText}>{name}</span>
      </a>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { name, id } = directMessage;
    return (
      <a href="#0" key={id} className={getChannelSelect(directMessage)} onClick={() => doSelectChannel(directMessage)}>
        <div className={styles.metkaOnLine} />
        <span className={styles.buttonText}>{name}</span>
      </a>
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

  const goToThreadsCallBack = () => {
    goToThreads(true);
  };

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('Invite to workspace', faUserFriends, showInvitePopup)}
      {channelSelector('Threads', faClipboardList, goToThreadsCallBack)}
      {channelSelector('Mentions & reactions', faAt)}
      {channelSelector('Drafts', faListAlt)}
      {channelSelector('Saved Items', faSearch)}
      {channelSelector('File Browser', faDatabase)}
      <hr className={styles.hrr} />
      <div className={styles.buttonChanel}>
        <button type="button" className={styles.buttonSelect} onClick={() => setChatPanel(!chatPanel)}>
          <FontAwesomeIcon icon={faPlay} className={getClassNameImg(chatPanel)} />
          <span className={styles.buttonText}>Chanels</span>
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
  // eslint-disable-next-line
  selectedChat: state.chat.chat!
});

const mapDispatchToProps = {
  goToThreads: goToThreadsRoutine,
  selectChat: setCurrentChatRoutine,
  fetchChats: fetchUserChatsRoutine,
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
