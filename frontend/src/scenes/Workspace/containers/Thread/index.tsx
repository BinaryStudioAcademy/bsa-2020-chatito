import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';

import ThreadView from 'containers/Thread';
import { IUser } from 'common/models/user/IUser';
import { fetchPostCommentsRoutine, addCommentRoutine } from '../../routines';
import { IAppState } from 'common/models/store';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICreateComment } from 'common/models/post/ICreateComment';

interface IProps {
  post: IPost;
  comments: IPost[];
  fetchPostComments: IBindingCallback1<string>;
  sendComment: IBindingCallback1<ICreateComment>;
}

const Thread: React.FC<IProps> = ({ post, comments, fetchPostComments, sendComment }) => {
  const { id: postId } = post;

  useEffect(() => {
    fetchPostComments(postId);
  }, []);

  const sendCommentHandler = (text: string) => {
    sendComment({ postId, text });
  };

  return (
    <>
      { comments
        ? <ThreadView post={post} comments={comments} sendComment={sendCommentHandler} />
        : null }
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { workspace: { activeThread: { post, comments } } } = state;
  return {
    post,
    comments
  };
};

const mapDispatchToProps = {
  fetchPostComments: fetchPostCommentsRoutine,
  sendComment: addCommentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
