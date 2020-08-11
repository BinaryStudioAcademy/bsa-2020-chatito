import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
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
import { IChat } from 'common/models/workstate/chat';
import styles from './styles.module.sass';
import { selectChatRoutine } from 'scenes/Workspace/routines';
import { showModalRoutine } from 'routines/modal';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import CreateChannelModal from 'containers/CreateChannelModal';

interface IProps {
  channels: IChat[];
  directMessages: IChat[];
  selectedChat: IChat;
  selectChatRoutine: Routine;
  showModal: ({ modalType, show }: IModalRoutine) => void;
}

const ChatToolbar = ({
  channels,
  directMessages,
  selectedChat,
  selectChatRoutine: selectRoutine,
  showModal
}: IProps) => {
  const [chatPanel, setChatPanel] = useState<boolean>(false);
  const [directPanel, setDirectPanel] = useState<boolean>(false);
  // Обработчики событий
  const doSelectChannel = (channel: IChat) => {
    selectRoutine(channel);
  };

  const getClassNameDiv = (state: boolean) => (
    state
      ? styles.listBoxHidden
      : styles.listBox
  );

  const getClassNameImg = (state: boolean) => (
    state
      ? styles.chanelsImgRotate
      : styles.chanelsImg
  );

  const getChannelSelect = (chat: IChat) => {
    if (selectedChat && selectedChat.id === chat.id) {
      return `${styles.channelSelect} ${styles.channelCurrent}`;
    }
    return styles.channelSelect;
  };

  const channelSelector = (text: string, iconFa: IconDefinition) => (
    <a href="#0" className={styles.channelSelect}>
      <FontAwesomeIcon icon={iconFa} color="white" />
      <span className={styles.buttonText}>{text}</span>
    </a>
  );

  const userChannel = (channel: IChat) => {
    const { name, isPrivate } = channel;
    return (
      <a href="#0" className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} color="white" />
        <span className={styles.buttonText}>{name}</span>
      </a>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { name } = directMessage;
    return (
      <a href="#0" className={getChannelSelect(directMessage)} onClick={() => doSelectChannel(directMessage)}>
        <div className={styles.metkaOnLine} />
        <span className={styles.buttonText}>{name}</span>
      </a>
    );
  };

  return (
    <>
      <div className={styles.leftToolbar}>
        {channelSelector('Threads', faPodcast)}
        {channelSelector('Mentions & reactions', faAt)}
        {channelSelector('Drafts', faCopy)}
        {channelSelector('Channel browser', faSearch)}
        {channelSelector('People & user groups', faIdCard)}
        {channelSelector('Apps', faTh)}
        {channelSelector('File Browser', faDatabase)}
        {channelSelector('Show less', faReply)}
        <hr className={styles.hrr} />
        <div className={styles.buttonChanel}>
          <button type="button" className={styles.buttonSelect} onClick={() => setChatPanel(!chatPanel)}>
            <FontAwesomeIcon icon={faPlay} color="blue" className={getClassNameImg(chatPanel)} />
            <span className={styles.buttonText}>Chanels</span>
          </button>
          <button
            type="button"
            className={styles.buttonPlus}
            onClick={() => showModal({ modalType: ModalTypes.CreateChannel, show: true })}
          >
            <FontAwesomeIcon icon={faPlus} color="white" />
          </button>
          <div className={styles.chanelInfo}>
            Create New Chanel
          </div>
        </div>
        <div className={getClassNameDiv(chatPanel)}>
          {channels.map(channel => (
            userChannel(channel)))}
        </div>
        <hr className={styles.hrr} />
        <div className={styles.buttonChanel}>
          <button type="button" className={styles.buttonSelect} onClick={() => setDirectPanel(!directPanel)}>
            <FontAwesomeIcon icon={faPlay} color="blue" className={getClassNameImg(directPanel)} />
            <span className={styles.buttonText}>Direct Messages</span>
          </button>
          <div className={styles.buttonPlus}>
            <FontAwesomeIcon icon={faPlus} color="white" />
          </div>
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
        <hr className={styles.hrr} />
      </div>

      <CreateChannelModal />
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  channels: state.workspace.channels,
  directMessages: state.workspace.directMessages,
  selectedChat: state.workspace.selectedChat
});

const mapDispatchToProps = {
  selectChatRoutine,
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
