import React, { useContext } from 'react';
import styles from './styles.module.sass';
import { ProfileContext, IContext } from 'scenes/Workspace/containers/Workspace/index';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'components/Post/index';

interface IProps {
  messages: IPost[];
}

const ChatBody: React.FC<IProps> = ({ messages }) => {
  const {
    setShowProfileHandler,
    setUserDataHandler
  } = useContext(ProfileContext) as IContext; // eslint-disable @typescript-eslint/no-unused-vars
  // mocked post data
  return (
    <div className={styles.chatBody}>
      {messages.map(m => <Post post={m} key={m.id} />)}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  messages: state.chat.posts
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
