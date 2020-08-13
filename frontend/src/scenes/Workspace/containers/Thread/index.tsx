import React from 'react';
import { connect } from 'react-redux';

import ThreadView from 'containers/Thread';
import { IAppState } from 'common/models/store';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IUser } from 'common/models/user/IUser';
import { addCommentRoutine } from 'scenes/Workspace/routines';

interface IProps {
  post: IPost | undefined;
  comments: IPost[] | undefined;
  sendComment: IBindingCallback1<ICreateComment>;
  onHide: IBindingAction;
  openUserProfile: IBindingCallback1<IUser>;
}

const Thread: React.FC<IProps> = ({
  post,
  comments = [],
  sendComment,
  onHide,
  openUserProfile
}) => {
  const postId = post?.id;

  const sendCommentHandler = (text: string) => {
    if (postId) {
      sendComment({ postId, text });
    }
  };

  return (
    post
      ? (
        <ThreadView
          width="400px"
          post={post}
          comments={comments}
          sendComment={sendCommentHandler}
          onHide={onHide}
          openUserProfile={openUserProfile}
        />
      ) : null
  );
};

const mapStateToProps = (state: IAppState) => ({
  // const { workspace: { activeThread: { post, comments } } } = state;
  post: state.workspace.activeThread?.post,
  comments: state.workspace.activeThread?.comments
});

const mapDispatchToProps = {
  sendComment: addCommentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
