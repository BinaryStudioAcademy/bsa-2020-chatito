import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Media } from 'react-bootstrap';
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
import { showUserProfileRoutine } from 'scenes/Workspace/routines';

interface IProps {
  post: IPost;
  userId: string;
  type: PostType;
  openThread?: IBindingCallback1<IPost>;
  addPostReaction: IBindingCallback1<IPostReactionRoutine>;
  deletePostReaction: IBindingCallback1<IPostReactionRoutine>;
  showUserProfile: IBindingCallback1<IUser>;
}

const Post: React.FC<IProps> = ({ post: postData, userId, type, openThread,
  addPostReaction, deletePostReaction, showUserProfile }) => {
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

  return (
    <Media className={styles.postWrapper}>
      <ProfilePreview user={createdByUser} onSend={onSend} openProfile={showUserProfile} />
      <Media.Body bsPrefix={styles.body}>
        <a href="/" className={styles.author}>{createdByUser.fullName}</a>
        <br />
        <a href="/" className={styles.metadata}>{dayjs(createdAt).format('hh:mm A')}</a>
        {/* eslint-disable-next-line */}
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        <div className={styles.emojiStats}>
          {type === PostType.Post && renderEmojis()}
        </div>
        <div className={styles.footer}>
          { openThread && (
            <Card.Link
              bsPrefix={styles.openThreadBtn}
              onClick={() => openThread(post)}
            >
              Reply
            </Card.Link>
          )}
          {type === PostType.Post && <EmojiPopUp trigger={trigger} onEmojiClick={onEmojiClick} />}
        </div>
      </Media.Body>
    </Media>
  );
};

const mapStateToProps = (state: IAppState) => ({
  userId: state.user.user?.id as string
});

const mapDispatchToProps = {
  addPostReaction: addPostReactionRoutine,
  deletePostReaction: deletePostReactionRoutine,
  showUserProfile: showUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
