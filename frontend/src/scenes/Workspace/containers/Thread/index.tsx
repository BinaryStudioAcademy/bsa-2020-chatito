import React from 'react';
import { connect } from 'react-redux';

import ThreadView from 'containers/Thread';
import { IAppState } from 'common/models/store';
import { IPost } from 'common/models/post/IPost';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IUser } from 'common/models/user/IUser';

interface IProps {
  post: IPost | undefined;
  comments: IPost[] | undefined;
  onHide: IBindingAction;
  openUserProfile: IBindingCallback1<IUser>;
}

const Thread: React.FC<IProps> = ({
  post,
  comments = [],
  onHide,
  openUserProfile
}) => (
  post
    ? (
      <ThreadView
        width="400px"
        post={post}
        comments={comments}
        onHide={onHide}
        openUserProfile={openUserProfile}
      />
    ) : null
);

const mapStateToProps = (state: IAppState) => ({
  post: state.workspace.activeThread?.post,
  comments: state.workspace.activeThread?.comments
});

export default connect(mapStateToProps)(Thread);
