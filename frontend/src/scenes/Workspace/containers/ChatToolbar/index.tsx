import React, { useState, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faUserFriends,
  faLock,
  faHashtag,
  faPodcast,
  faAt,
  faCopy,
  faSearch,
  faIdCard,
  faTh,
  faDatabase,
  faReply,
  faPlus,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import styles from './styles.module.sass';
import { goToThreadsRoutine } from 'containers/ThreadsContainer/routines';
import { setCurrentChatRoutine } from 'scenes/Chat/routines';
import { fetchUserChatsRoutine } from '../../routines';
import { showModalRoutine } from 'routines/modal';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
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
      <FontAwesomeIcon icon={iconFa} color="white" />
      <span className={styles.buttonText}>{text}</span>
    </a>
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate, id } = channel;
    return (
      <a href="#0" key={id} className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} color="white" />
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

  const showInvitePopup = () => {
    showModal({ modalType: ModalTypes.InvitePopup, show: true });
  };

  const goToThreadsCallBack = () => {
    goToThreads(true);
  };

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('Invite to workspace', faUserFriends, showInvitePopup)}
      {channelSelector('Threads', faPodcast, goToThreadsCallBack)}
      {channelSelector('Mentions & reactions', faAt)}
      {channelSelector('Drafts', faCopy)}
      {channelSelector('Channel browser', faSearch)}
      {channelSelector('People & user groups', faIdCard)}
      {channelSelector('Apps', faTh)}
      {channelSelector('File Browser', faDatabase)}
      {channelSelector('Show less', faReply)}
      <hr className={styles.hrr} />

      <div className={styles.buttonChanel}>
        <div className={styles.channelButtonsWrapper}>
          <button type="button" className={styles.buttonSelect} onClick={() => setChatPanel(!chatPanel)}>
            <FontAwesomeIcon icon={faPlay} color="blue" className={getClassNameImg(chatPanel)} />
            <span className={styles.buttonText}>Chanels</span>
          </button>

          <button
            type="button"
            className={styles.buttonPlus}
            onClick={() => showModal({ modalType: ModalTypes.CreateChannel, show: true })}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={getClassNameDiv(chatPanel)}>
          {channels.map(channel => (
            userChannel(channel)))}
        </div>

        <hr className={styles.hrr} />
        <div className={styles.buttonChanel}>
          <div className={styles.channelButtonsWrapper}>
            <button type="button" className={styles.buttonSelect} onClick={() => setDirectPanel(!directPanel)}>
              <FontAwesomeIcon icon={faPlay} color="blue" className={getClassNameImg(directPanel)} />
              <span className={styles.buttonText}>Direct Messages</span>
            </button>
            <button
              type="button"
              className={styles.buttonPlus}
              onClick={() => showModal({ modalType: ModalTypes.CreateDirect, show: true })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <div className={styles.directInfo}>
              Open a direct message
              <br />
              Ctrl + Shift + K
            </div>
          </div>
          <div className={getClassNameDiv(directPanel)}>
            {directMessages.map(directMessage => (
              directChannel(directMessage)))}
          </div>
        </div>
        <hr className={styles.hrr} />
      </div>
      <div className={getClassNameDiv(directPanel)}>
        {directMessages.map(directMessage => directChannel(directMessage))}
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
