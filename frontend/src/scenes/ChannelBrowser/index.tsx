import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { InputGroup, FormControl, Button, OverlayTrigger } from 'react-bootstrap';
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
import { searchChannels } from 'common/helpers/searchHelper';

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
  const [channelList, setChannelList] = useState(channels);
  const [text, setText] = useState('');
  useEffect(() => {
    fetchBrowserChannels(currentWorkspaceId);
  }, []);
  useEffect(() => {
    let copiedChannels = [...channels];
    if (text) {
      copiedChannels = searchChannels(copiedChannels, text.trim());
    }
    setChannelList(copiedChannels);
  }, [channels]);

  const onCreateChannel = () => showModal({ modalType: ModalTypes.CreateChannel, show: true });

  const searchChannelHandler = (value: string) => {
    const result = searchChannels(channels, value.trim());
    setChannelList(result);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
    searchChannelHandler(value);
  };

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
          <FormControl placeholder="Search by channel name" value={text} onChange={onChange} />
        </InputGroup>
        <div className={styles.controlsWrp}>
          <div>{channelList.length > 1 ? `${channelList.length} channels` : `${channelList.length} channel`}</div>
          <div>
            <OverlayTrigger trigger="click" placement="bottom" overlay={<div />}>
              <button type="button" className={`${styles.sortBtn} button-unstyled`}>
                <FontAwesomeIcon icon={faSort} size="lg" />
                <span>Sort: A to Z</span>
              </button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="bottom" overlay={<div />}>
              <button type="button" className={`${styles.filterBtn} button-unstyled`}>
                <FontAwesomeIcon icon={faFilter} />
                <span>Filter</span>
              </button>
            </OverlayTrigger>
          </div>
        </div>
        <div className={styles.channelsWrp}>
          <LoaderWrapper loading={loading}>
            {channelList.map(channel => (
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
