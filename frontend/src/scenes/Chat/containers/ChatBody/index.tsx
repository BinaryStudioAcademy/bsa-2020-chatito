import React from 'react';
import styles from './styles.module.sass';
import Post from 'components/Post/index';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { setActiveThreadRoutine, showUserProfileRoutine } from 'scenes/Workspace/routines';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
// mocked post data
const postMock = {
  user: {
    id: '87d8eee5-6655-422a-a0b8-05a4709b626c',
    fullName: 'demo',
    email: 'demo10@demo.com',
    displayName: 'demo',
    imageUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
    title: 'string',
    status: 'online'
  },
  id: 'e4bf2dab-1fc1-4c9b-a75e-67c23418d9c2',
  text: 'Phasellus varius pretium vulputate. Sed finibus maximus tortor, ac cursus nulla dignissim a. Mauris iaculis, turpis vel pulvinar iaculis, ex ipsum rhoncus erat, sit amet convallis turpis libero posuere urna. Donec orci nulla, ultrices sit amet enim quis, suscipit posuere eros. Aenean sed magna diam. Donec imperdiet sagittis nulla, elementum feugiat sapien maximus quis. Nulla nec rhoncus urna. Suspendisse mi dui, sollicitudin sit amet ante ut, semper malesuada nisi.', // eslint-disable-line
  createdAt: '2020-08-11T12:40:36.072Z'
};

interface IProps {
  openProfile: IBindingAction;
  openThread: IBindingCallback1<IPost>;
  activeThreadPostId: string | undefined;
}

const ChatBody = ({ openProfile, openThread, activeThreadPostId = '' }: IProps) => {
  const handleOpenThread = (post: IPost) => {
    if (activeThreadPostId === post.id) return;
    openThread(post);
  };

  return (
    <div className={styles.chatBody}>
      <Post post={postMock} openThread={handleOpenThread} openUserProfile={openProfile} />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const activeThreadPostId = state.workspace.activeThread?.post.id;
  return {
    activeThreadPostId
  };
};

const mapDispatchToProps = {
  openProfile: showUserProfileRoutine,
  openThread: setActiveThreadRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
