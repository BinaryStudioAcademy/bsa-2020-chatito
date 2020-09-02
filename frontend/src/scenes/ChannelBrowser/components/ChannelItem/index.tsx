import React from 'react';
import styles from './styles.module.sass';
import { Routes } from 'common/enums/Routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { IBrowserChat } from 'common/models/chat/IBrowserChat';

interface IProps {
  whash: string;
  currentUserId: string;
  channel: IBrowserChat;
}

export const ChannelItem: React.FC<IProps> = ({ whash, currentUserId, channel }) => {
  const { users, isPrivate, name, hash: chash } = channel;

  const isUserChatMember = users.find(user => user.id === currentUserId);
  const membersCount = users.length;

  const getChatRoute = () => (
    Routes.Chat.replace(':whash', whash).replace(':chash', chash)
  );

  return (
    <Link to={getChatRoute()}>
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
        {
          isUserChatMember
            ? <Button className={[styles.leaveBtn, styles.channelBtn].join(' ')}>Leave</Button>
            : <Button className={[styles.joinBtn, styles.channelBtn].join(' ')}>Join</Button>
        }
      </div>
    </Link>
  );
};
