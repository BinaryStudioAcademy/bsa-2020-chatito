import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Media, Popover, Button, OverlayTrigger, ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import styles from './styles.module.sass';
import { IPost } from 'common/models/post/IPost';
import { IUser } from 'common/models/user/IUser';
import ProfilePreview from 'components/ProfilePreview/index';
import EmojiPopUp from 'components/EmojiPopUp';
import { countBy, toLower } from 'ramda';
import { IEmojiData } from 'emoji-picker-react';
import { addPostReactionRoutine, deletePostReactionRoutine } from 'containers/Post/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPostReactionRoutine } from 'common/models/postReaction/IPostReactionRoutine';
import { IAppState } from 'common/models/store';
import { PostType } from 'common/enums/PostType';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import CustomReminderModal from 'containers/CustomReminderModal';
import { showUserProfileRoutine } from 'scenes/Workspace/routines';

interface IProps {
  post: IPost;
  userId: string;
  type: PostType;
  openThread?: IBindingCallback1<IPost>;
  addPostReaction: IBindingCallback1<IPostReactionRoutine>;
  deletePostReaction: IBindingCallback1<IPostReactionRoutine>;
  showUserProfile: IBindingCallback1<IUser>;
  showModal: IBindingCallback1<IModalRoutine>;
  isShown: boolean;
}

const Post: React.FC<IProps> = ({ post: postData, userId, type, openThread,
  showUserProfile, addPostReaction, deletePostReaction, showModal, isShown }) => {
  const [post, setPost] = useState(postData);
  const [changedReaction, setChangedReaction] = useState('');

  useEffect(() => {
    setPost(postData);
  }, [postData]);

  useEffect(() => {
    if (changedReaction) {
      if (postData.postReactions.length < post.postReactions.length) {
        addPostReaction({ post, reaction: changedReaction });
      } else {
        deletePostReaction({ post, reaction: changedReaction });
      }
      setChangedReaction('');
    }
  }, [post]);

  const { createdByUser, text, postReactions } = post;
  const createdAt = new Date(post.createdAt);

  const trigger = () => (
    <button type="button" className={`${styles.reactBtn} button-unstyled`}>React</button>
  );

  const onEmojiHandler = (emoji: string) => {
    setChangedReaction(emoji);

    setPost(state => {
      const userReactions = state.postReactions
        .filter(react => react.userId === userId)
        .map(react => react.reaction);

      if (userReactions.includes(emoji)) {
        return {
          ...state,
          postReactions: state.postReactions.filter(r => r.userId !== userId || r.reaction !== emoji)
        };
      }
      return {
        ...state,
        postReactions: [...state.postReactions, { reaction: emoji, userId }]
      };
    });
  };

  const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    onEmojiHandler(emojiObject.emoji);
    document.body.click();
  };

  const countEmojis = (emojis: string[]) => countBy(toLower)(emojis);

  const renderEmojis = () => {
    const userReactions = postReactions
      .filter(react => react.userId === userId)
      .map(react => react.reaction);
    const emojis = postReactions.map(postReaction => postReaction.reaction);
    const countedEmojis = countEmojis(emojis);

    return Object.keys(countedEmojis).map(emoji => {
      const emojiStyles = [styles.emojiStatItem, userReactions.includes(emoji) ? styles.active : ''];
      return (
        <button type="button" key={emoji} className={emojiStyles.join(' ')} onClick={() => onEmojiHandler(emoji)}>
          <span className={styles.emoji}>{emoji}</span>
          <span>{countedEmojis[emoji]}</span>
        </button>
      );
    });
  };

  const onSend = () => {
    console.log('Send text message'); // eslint-disable-line
  };

  const popoverRemindOptions = (
    <Popover id="popover-basic" className={isShown ? styles.dNone : ''}>
      <Popover.Content>
        <ListGroup>
          <ListGroup.Item action>
            In 20 minutes
          </ListGroup.Item>
          <ListGroup.Item action>
            In 1 hour
          </ListGroup.Item>
          <ListGroup.Item action>
            In 3 hours
          </ListGroup.Item>
          <ListGroup.Item action>
            Tomorrow
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => showModal({ modalType: ModalTypes.SetReminder, show: true })}>
            Custom...
          </ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );

  const popoverMore = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">More actions</Popover.Title>
      <Popover.Content>
        <ListGroup>
          <OverlayTrigger trigger="click" placement="right" overlay={popoverRemindOptions}>
            <ListGroup.Item action>
              Remind me about that &gt;
            </ListGroup.Item>
          </OverlayTrigger>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );

  const ButtonMore = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popoverMore}>
      <Card.Link
        bsPrefix={styles.openThreadBtn}
      >
        More
      </Card.Link>
    </OverlayTrigger>
  );

  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={createdByUser} onSend={onSend} openProfile={showUserProfile} />
      <Media.Body bsPrefix={styles.body}>
        <button
          onClick={() => showUserProfile(createdByUser)}
          className={`${styles.author} button-unstyled`}
          type="button"
        >
          {createdByUser.fullName}
        </button>

        <br />

        <button type="button" className={styles.metadata}>{dayjs(createdAt).format('hh:mm A')}</button>
        {/* eslint-disable-next-line */}
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        <div className={styles.emojiStats}>
          {type === PostType.Post && renderEmojis()}
        </div>
        <div className={styles.footer}>
          {openThread && (
            <Card.Link
              bsPrefix={styles.openThreadBtn}
              onClick={() => openThread(post)}
            >
              Reply
            </Card.Link>
          )}
          {type === PostType.Post && <EmojiPopUp trigger={trigger} onEmojiClick={onEmojiClick} />}
          <ButtonMore />
        </div>
      </Media.Body>
      <CustomReminderModal />
    </Media>
  );
};

const mapStateToProps = (state: IAppState) => ({
  userId: state.user.user?.id as string,
  isShown: state.modal.setReminder
});

const mapDispatchToProps = {
  addPostReaction: addPostReactionRoutine,
  deletePostReaction: deletePostReactionRoutine,
  showModal: showModalRoutine,
  showUserProfile: showUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
