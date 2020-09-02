import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { ChannelItem } from './components/ChannelItem';
import { fetchBrowserChannelsRoutine } from './routines';
import { IBrowserChat } from 'common/models/chat/IBrowserChat';

interface IProps {
  match: {
    params: {
      whash: string;
    };
  };
  currentUserId: string;
  currentWorkspaceId: string;
  fetchBrowserChannels: (workspaceId: string) => void;
  channels: IBrowserChat[];
}

const ChannelBrowser: React.FC<IProps> = ({ match, currentUserId, currentWorkspaceId,
  channels = [], fetchBrowserChannels }) => {
  useEffect(() => {
    fetchBrowserChannels(currentWorkspaceId);
  }, []);

  return (
    <div className={styles.ChannelBrowser}>
      <header className={styles.header}>
        <h1>Channel browser</h1>
        <Button className={styles.createBtn}>Create Channel</Button>
      </header>
      <div className={styles.main}>
        <InputGroup className={styles.search}>
          <InputGroup.Prepend className={styles.searchPrepend}>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search by channel name or description"
          />
        </InputGroup>
        <div className={styles.controlsWrp}>
          <div>{channels.length > 1 ? `${channels.length} channels` : `${channels.length} channel`}</div>
          <div>
            <button type="button" className={`${styles.sortBtn} button-unstyled`}>
              <FontAwesomeIcon icon={faSort} size="lg" />
              <span>Sort: A to Z</span>
            </button>
            <button type="button" className={`${styles.filterBtn} button-unstyled`}>
              <FontAwesomeIcon icon={faFilter} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className={styles.channelsWrp}>
          {channels.map((channel: any) => (
            <ChannelItem key={channel.id} whash={match.params.whash} currentUserId={currentUserId} channel={channel} />
          ))}
          <div className={styles.center}>
            <Button className={styles.createBtn}>Create Channel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  currentUserId: state.user.user?.id as string,
  channels: state.channelBrowser.channels,
  currentWorkspaceId: state.workspace.workspace.id
});

const mapDispatchToProps = {
  fetchBrowserChannels: fetchBrowserChannelsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBrowser);
