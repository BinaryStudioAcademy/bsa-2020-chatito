import React from 'react';
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
import { IAppState } from '../../common/models/store';
import { IWorkspaceState } from '../../scenes/Workspace/reducers/reducer';
import { IChat } from '../../common/models/workstate/chat';
import styles from './styles.module.sass';
import { userChannelRoutine } from '../../scenes/Workspace/routines';

let linkPanel = false;
let directPanel = false;

interface IProps {
  workstate: IWorkspaceState;
  userChannelRoutine: Routine;
}

const ChatToolbar = ({
  workstate,
  userChannelRoutine: channelRoutine
}: IProps) => {
  const { channels, directMessages, selectedChat } = workstate;
  // Обработчики событий
  const doThreadSelect = (chat: IChat) => {
    // Select Thread Channel
    channelRoutine(chat);
  };
  const doMentionsSelect = (chat: IChat) => {
    // Select Mentions & reactions Channel
    channelRoutine(chat);
  };
  const doDraftSelect = (chat: IChat) => {
    // Select Drafts Channel
    channelRoutine(chat);
  };
  const doChannelBrowserSelect = (chat: IChat) => {
    // Select Channel Browser
    channelRoutine(chat);
  };
  const doPeopleGrupsSelect = (chat: IChat) => {
    // Select People & user groups
    channelRoutine(chat);
  };
  const doAppsSelect = (chat: IChat) => {
    // Select Apps Channel
    channelRoutine(chat);
  };
  const doFileBrowseSelect = (chat: IChat) => {
    // Select File Browser
    channelRoutine(chat);
  };
  const doShowLessSelect = (chat: IChat) => {
    // Select Show less Channel
    channelRoutine(chat);
  };
  const doSelectChannel = (channel: IChat) => {
    channelRoutine(channel);
  };

  const getClassNameDiv = (state: boolean) => (
    state
      ? styles.listBoxHidden
      : styles.listBox
  );
  const getClassNameDivDefault = (state: boolean) => (
    state
      ? styles.listBoxHiddenDeff
      : styles.listBoxDeff
  );
  const getClassNameImg = (state: boolean) => (
    state
      ? styles.chanelsImgRotate
      : styles.chanelsImg
  );

  const changeListView = () => {
    linkPanel = !linkPanel;
    const element = document.getElementById('divChanel') as HTMLElement;
    element.className = getClassNameDiv(linkPanel);
    const imgs = document.getElementById('imgChanel') as HTMLElement;
    imgs.style.transform = linkPanel ? 'none' : 'rotate(90deg)';
  };

  const changeDirectView = () => {
    directPanel = !directPanel;
    const element = document.getElementById('divDirect') as HTMLElement;
    element.className = getClassNameDiv(directPanel);
    const imgs = document.getElementById('imgDirect') as HTMLElement;
    imgs.style.transform = directPanel ? 'none' : 'rotate(90deg)';
  };

  const getChannelSelect = (chat: IChat) => {
    if (selectedChat && selectedChat.id === chat.id) {
      return `${styles.channelSelect} ${styles.channelCurrent}`;
    }
    return styles.channelSelect;
  };

  const channelSelector = (id: string, text: string, iconFa: IconDefinition, callback: (chat: IChat) => void) => {
    const chat: IChat = { id, channelName: text, isPrivate: false };
    return (
      <a href="#0" className={getChannelSelect(chat)} onClick={() => callback(chat)}>
        <FontAwesomeIcon icon={iconFa} color="white" />
        <span className={styles.buttonText}>{text}</span>
      </a>
    );
  };

  const userChannel = (channel: IChat) => {
    const { channelName, isPrivate } = channel;
    return (
      <a href="#0" className={getChannelSelect(channel)} onClick={() => doSelectChannel(channel)}>
        <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} color="white" />
        <span className={styles.buttonText}>{channelName}</span>
      </a>
    );
  };

  const directChannel = (directMessage: IChat) => {
    const { channelName } = directMessage;
    return (
      <a href="#0" className={getChannelSelect(directMessage)} onClick={() => doSelectChannel(directMessage)}>
        <div className={styles.metkaOnLine} />
        <span className={styles.buttonText}>{channelName}</span>
      </a>
    );
  };

  return (
    <div className={styles.leftToolbar}>
      {channelSelector('top001', 'Threads', faPodcast, doThreadSelect)}
      {channelSelector('top002', 'Mentions & reactions', faAt, doMentionsSelect)}
      {channelSelector('top003', 'Drafts', faCopy, doDraftSelect)}
      {channelSelector('top004', 'Channel browser', faSearch, doChannelBrowserSelect)}
      {channelSelector('top005', 'People & user groups', faIdCard, doPeopleGrupsSelect)}
      {channelSelector('top006', 'Apps', faTh, doAppsSelect)}
      {channelSelector('top007', 'File Browser', faDatabase, doFileBrowseSelect)}
      {channelSelector('top008', 'Show less', faReply, doShowLessSelect)}
      <hr className={styles.hrr} />
      <div className={styles.buttonChanel}>
        <button type="button" className={styles.buttonSelect} onClick={changeListView}>
          <FontAwesomeIcon id="imgChanel" icon={faPlay} color="blue" className={getClassNameImg(linkPanel)} />
          <span className={styles.buttonText}>Chanels</span>
        </button>
        <div className={styles.buttonPlus}>
          <FontAwesomeIcon icon={faPlus} color="white" />
        </div>
        <div className={styles.chanelInfo}>
          Create New Chanel
        </div>
      </div>
      <div id="divChanel" className={getClassNameDivDefault(linkPanel)}>
        {channels.map(channel => (
          userChannel(channel)))}
      </div>
      <hr className={styles.hrr} />
      <div className={styles.buttonChanel}>
        <button type="button" className={styles.buttonSelect} onClick={changeDirectView}>
          <FontAwesomeIcon id="imgDirect" icon={faPlay} color="blue" className={getClassNameImg(linkPanel)} />
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
      <div id="divDirect" className={getClassNameDivDefault(directPanel)}>
        {directMessages.map(directMessage => (
          directChannel(directMessage)))}
      </div>
      <hr className={styles.hrr} />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  workstate: state.workspace
});

const mapDispatchToProps = {
  userChannelRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
