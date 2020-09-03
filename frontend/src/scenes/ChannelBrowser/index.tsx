import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import ChannelItem from './containers/ChannelItem';
import { fetchBrowserChannelsRoutine } from './routines';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';
import LoaderWrapper from 'components/LoaderWrapper';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { showModalRoutine } from 'routines/modal';

interface IProps {
  match: {
    params: {
      whash: string;
    };
  };
  currentWorkspaceId: string;
  channels: IBrowserChannel[];
  loading: boolean;
  fetchBrowserChannels: (workspaceId: string) => void;
  showModal: IBindingCallback1<IModalRoutine>;
}

const ChannelBrowser: React.FC<IProps> = ({ match, currentWorkspaceId, channels = [],
  loading, fetchBrowserChannels, showModal }) => {
  useEffect(() => {
    fetchBrowserChannels(currentWorkspaceId);
  }, []);

  const onCreateChannel = () => showModal({ modalType: ModalTypes.CreateChannel, show: true });

  return (
    <div className={styles.ChannelBrowser}>
      <header className={styles.header}>
        <h1>Channel browser</h1>
        <Button className={styles.createBtn} onClick={onCreateChannel}>Create Channel</Button>
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
          <LoaderWrapper loading={loading}>
            {channels.map(channel => (
              <ChannelItem
                key={channel.id}
                whash={match.params.whash}
                channel={channel}
              />
            ))}
            <div className={styles.center}>
              <Button className={styles.createBtn} onClick={onCreateChannel}>Create Channel</Button>
            </div>
          </LoaderWrapper>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  channels: state.channelBrowser.channels,
  currentWorkspaceId: state.workspace.workspace.id,
  loading: state.channelBrowser.loading
});

const mapDispatchToProps = {
  fetchBrowserChannels: fetchBrowserChannelsRoutine,
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBrowser);
