import React from 'react';
import styles from './styles.module.sass';
import Post from 'components/Post/index';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { setActiveThreadRoutine, showRightSideMenuRoutine } from 'scenes/Workspace/routines';
import { connect } from 'react-redux';
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
  text: 'Post test',
  createdAt: new Date('2020-08-11T12:40:36.072Z')
};

interface IProps {
  openProfile: IBindingAction;
  openThread: IBindingCallback1<IPost>;
}

const ChatBody = ({ openProfile, openThread }: IProps) => (
  <div className={styles.chatBody}>
    <Post post={postMock} openThread={openThread} openProfile={openProfile} />
  </div>
);

const mapDispatchToProps = {
  openProfile: showRightSideMenuRoutine,
  openThread: setActiveThreadRoutine
};

export default connect(null, mapDispatchToProps)(ChatBody);
