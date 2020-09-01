import React from 'react';
import styles from './styles.module.sass';
import { Routes } from 'common/enums/Routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

interface IProps {
  whash: string;
  currentUserId: string;
  channel: any;
}

export const ChannelItem: React.FC<IProps> = ({ whash, currentUserId, channel }) => {
  const getChatRoute = (chash: string) => (
    Routes.Chat.replace(':whash', whash).replace(':chash', chash)
  );

  const isUserChatMember = channel.users.find((user: any) => user.id === currentUserId);
  const membersCount = channel.users.length;

  return (
    <Link to={getChatRoute(channel.hash)} key={channel.id}>
      <div className={styles.channel}>
        <h4 className={styles.channelName}>{`#${channel.name}`}</h4>
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
        {
          isUserChatMember
            ? <Button className={[styles.joinBtn, styles.channelBtn].join(' ')}>Join</Button>
            : <Button className={[styles.leaveBtn, styles.channelBtn].join(' ')}>Leave</Button>
        }
      </div>
    </Link>
  );
};
