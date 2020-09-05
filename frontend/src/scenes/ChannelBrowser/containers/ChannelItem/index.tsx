import React from 'react';
import styles from './styles.module.sass';
import { Routes } from 'common/enums/Routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { joinChannelFromBrowserRoutine, leaveChannelFromBrowserRoutine } from 'scenes/ChannelBrowser/routines';
import { IJoinOrLeaveChannel } from 'common/models/chat/IJoinOrLeaveChannel';
import { Location } from 'history';

interface IProps {
  whash: string;
  currentUserId: string;
  channel: IBrowserChannel;
  loading: boolean;
  leaveChannel: IBindingCallback1<IJoinOrLeaveChannel>;
  joinChannel: IBindingCallback1<IJoinOrLeaveChannel>;
}

const ChannelItem: React.FC<IProps> = ({ whash, currentUserId, channel, loading,
  leaveChannel, joinChannel }) => {
  const { users, isPrivate, name, hash: chash, id } = channel;
  const isUserChatMember = users.find(user => user.id === currentUserId);
  const membersCount = users.length;

  const getChatRoute = (location: Location) => {
    if (isPrivate && !isUserChatMember) return location;
    return Routes.Chat.replace(':whash', whash).replace(':chash', chash);
  };

  const onJoin = () => {
    joinChannel({ chatId: id, userId: currentUserId });
  };

  const onLeave = () => {
    leaveChannel({ chatId: id, userId: currentUserId });
  };

  return (
    <div className={styles.channelItem}>
      <Link to={getChatRoute}>
        <div className={styles.channel}>
          <h4 className={styles.channelName}>
            <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} size="xs" />
            <span>{name}</span>
          </h4>
          <div className={styles.chatInfo}>
            {isUserChatMember && (
              <div className={styles.joined}>
                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                <span>Joined</span>
              </div>
            )}
            <div className={styles.participants}>
              {membersCount > 1
                ? `${membersCount} members`
                : `${membersCount} member`}
            </div>
          </div>
        </div>
      </Link>
      <button
        className={[isUserChatMember ? styles.leaveBtn : styles.joinBtn, styles.channelBtn].join(' ')}
        onClick={isUserChatMember ? onLeave : onJoin}
        disabled={loading}
        type="button"
      >
        <span>{isUserChatMember ? 'Leave' : 'Join'}</span>
        {loading && !isUserChatMember && <Spinner animation="border" role="status" size="sm" />}
      </button>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  currentUserId: state.user.user?.id as string,
  loading: state.channelBrowser.btnLoading
});

const mapDispatchToProps = {
  leaveChannel: leaveChannelFromBrowserRoutine,
  joinChannel: joinChannelFromBrowserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
