import React from 'react';
import styles from './styles.module.sass';
import Post from 'components/Post/index';

// mocked post data
const post = {
  user: {
    id: '1',
    email: 'string',
    fullName: 'Test Fullname',
    displayName: 'string',
    imageUrl: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // eslint-disable-line max-len
    title: 'string',
    status: 'online'
  },
  text: 'Lorem ipsum dolor',
  createdAt: new Date()
};

const ChatBody = () => (
  <div className={styles.chatBody}>
    <Post post={post} />
  </div>
);

export default ChatBody;
