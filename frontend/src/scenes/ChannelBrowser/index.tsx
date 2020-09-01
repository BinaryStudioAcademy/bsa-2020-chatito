import React from 'react';
import styles from './styles.module.sass';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { ChannelItem } from './components/ChannelItem';

interface IProps {
  match: {
    params: {
      whash: string;
    };
  };
  currentUserId: string;
}

const ChannelBrowser: React.FC<IProps> = ({ match, currentUserId }) => {
  const channels = [
    {
      createdByUserId: 'd470c3f2-e9cf-4aaf-8e41-1eca0cd3de72',
      draftPosts: [],
      hash: '~.T50HK',
      id: 'b12e611b-c392-481b-a6d7-2241a3efb65c',
      isPrivate: false,
      name: 'chatito',
      type: 'Channel',
      users: [{ id: '713e55fb-5882-43c9-aa0e-b7ca82a2384d' }, { id: '2' }, { id: '3' }, { id: '4' }]
    },
    {
      createdByUserId: 'd470c3f2-e9cf-4aaf-8e41-1eca0cd3de72',
      draftPosts: [],
      hash: '~.T50HK',
      id: 'b12e611b-c392-481b-a6d7-2241a3efb653',
      isPrivate: false,
      name: 'general',
      type: 'Channel',
      users: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]
    }
  ];

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
          <div>4 channels</div>
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
          {channels.map(channel => (
            <ChannelItem whash={match.params.whash} currentUserId={currentUserId} channel={channel} />
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
  currentUserId: state.user.user?.id as string
});

export default connect(mapStateToProps, null)(ChannelBrowser);
