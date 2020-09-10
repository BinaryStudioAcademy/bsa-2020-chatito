import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
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
import { SortOption } from './components/SortOption';
import { SortType } from 'common/enums/SortType';
import { getSortedChannels } from 'common/helpers/sortHelper';
import { FilterOption } from './components/FilterOption';
import { FilterType } from 'common/enums/FilterType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  match: {
    params: {
      whash: string;
    };
  };
  currentWorkspaceId: string;
  channels: IBrowserChannel[];
  loading: boolean;
  currentUserId: string;
  fetchBrowserChannels: (workspaceId: string) => void;
  showModal: IBindingCallback1<IModalRoutine>;
}

const ChannelBrowser: React.FC<IProps> = ({ match, currentWorkspaceId, channels = [],
  loading, currentUserId, fetchBrowserChannels, showModal }) => {
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState<SortType>(SortType.AToZ);
  const [filterOption, setFilterOption] = useState<FilterType>(FilterType.All);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    fetchBrowserChannels(currentWorkspaceId);
  }, []);

  const getPrivateChannels = (channelList: IBrowserChannel[]) => (
    channelList.filter(channel => channel.isPrivate)
  );

  const getNotOwnChannels = (channelList: IBrowserChannel[]) => (
    channelList.filter(channel => !channel.users.find(user => user.id === currentUserId))
  );

  const onCreateChannel = () => showModal({ modalType: ModalTypes.CreateChannel, show: true });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const sortOptionHandler = (option: SortType) => {
    setSortOption(option);
  };

  const filterOptionHandler = (option: FilterType) => {
    setFilterOption(option);
  };

  const checkboxHandler = () => {
    setIsChecked(!isChecked);
  };

  let channelList = getSortedChannels(channels, sortOption);
  if (filterOption === FilterType.Private) channelList = getPrivateChannels(channelList);
  if (isChecked) channelList = getNotOwnChannels(channelList);
  if (searchValue) channelList = searchChannels(channelList, searchValue);

  return (
    <div className={styles.ChannelBrowser}>
      <header className={styles.header}>
        <span className={styles.headerName}>Channel browser</span>
        <div className={styles.wrapper}>
          <InputGroup>
            <FormControl
              placeholder="Search by channel name"
              onChange={onChange}
              value={searchValue}
              className={styles.searchInput}
            />
          </InputGroup>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
      </header>
      <LoaderWrapper loading={loading}>
        <div className={styles.main}>
          <div className={styles.controlsWrp}>
            <div>
              {channelList.length > 1 || !channelList.length ? (
                `${channelList.length} channels`) : `${channelList.length} channel`}
            </div>
            <div className={styles.buttonsWrapper}>
              <SortOption setSortOption={sortOptionHandler} sortOption={sortOption} />
              <FilterOption
                filterOption={filterOption}
                setFilterOption={filterOptionHandler}
                isChecked={isChecked}
                setIsChecked={checkboxHandler}
              />
            </div>
          </div>
          <div className={styles.channelsWrp}>
            {channelList.map(channel => (
              <ChannelItem
                key={channel.id}
                whash={match.params.whash}
                channel={channel}
              />
            ))}
          </div>
          <div className={styles.center}>
            <Button
              variant="secondary"
              onClick={onCreateChannel}
              className="appButton save createChannel"
            >
              Create Channel
            </Button>
          </div>
        </div>
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  channels: state.channelBrowser.channels,
  currentWorkspaceId: state.workspace.workspace.id,
  loading: state.channelBrowser.loading,
  currentUserId: state.user.user?.id as string
});

const mapDispatchToProps = {
  fetchBrowserChannels: fetchBrowserChannelsRoutine,
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBrowser);
