import React from 'react';
import { connect } from 'react-redux';
import ThreadView from 'containers/Thread';
import { IAppState } from 'common/models/store';
import { IPost } from 'common/models/post/IPost';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  post: IPost | undefined;
  comments: IPost[] | undefined;
  onHide: IBindingAction;
}

const Thread: React.FC<IProps> = ({ post, comments = [], onHide }) => (
  post
    ? (
      <ThreadView
        post={post}
        comments={comments}
        onHide={onHide}
      />
    ) : null
);

const mapStateToProps = (state: IAppState) => ({
  post: state.workspace.activeThread?.post,
  comments: state.workspace.activeThread?.comments
});

export default connect(mapStateToProps)(Thread);
