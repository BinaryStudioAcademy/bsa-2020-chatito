import React from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'components/Post/index';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { showUserProfileRoutine, setActiveThreadRoutine } from 'scenes/Workspace/routines';

interface IProps {
  messages: IPost[];
  openProfile: IBindingAction;
  openThread: IBindingCallback1<IPost>;
  activeThreadPostId: string | undefined;
}

const ChatBody: React.FC<IProps> = ({ messages, openProfile, openThread, activeThreadPostId = '' }) => {
  const handleOpenThread = (post: IPost) => {
    if (activeThreadPostId === post.id) return;
    openThread(post);
  };

  return (
    <div className={styles.chatBody}>
      {messages.map(m => <Post post={m} openThread={handleOpenThread} openUserProfile={openProfile} />)}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  messages: state.chat.posts,
  activeThreadPostId: state.workspace.activeThread?.post.id
});

const mapDispatchToProps = {
  openProfile: showUserProfileRoutine,
  openThread: setActiveThreadRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
