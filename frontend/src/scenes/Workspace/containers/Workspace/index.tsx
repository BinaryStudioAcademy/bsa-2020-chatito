import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import Header from '../../../../containers/Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
import NoChatMessage from '../NoChatMessage';
import ProfileOverview from 'containers/ProfileOverview';
import { IUser } from 'common/models/user/IUser';
import { IAppState } from 'common/models/store';
import ChatScene from 'scenes/Chat';
import ChatToolbar from '../ChatToolbar';
import Thread from 'scenes/Workspace/containers/Thread';
import ThreadsContainer from 'containers/ThreadsContainer/index';
import DraftsContainer from 'scenes/Drafts';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import {
  selectWorkspaceRoutine,
  setActiveThreadRoutine,
  showRightSideMenuRoutine,
  fetchWorkspaceChatsRoutine,
  fetchUnreadUserPostsRoutine,
  fetchUnreadUserCommentsRoutine
} from 'scenes/Workspace/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import { IFetchWorkspaceChat } from 'common/models/chat/IFetchWorkspaceChat';

interface IProps {
  currentUserId?: string;
  match: {
    params: {
      whash: string;
      chash: string;
    };
  };
  userWorkspaces: IWorkspace[];
  router: (route: Routes | string) => void;
  selectWorkspace: (workspace: IWorkspace) => void;
  showRightSideMenu: RightMenuTypes;
  toggleRightMenu: IBindingCallback1<RightMenuTypes>;
  toggleActiveThread: IBindingCallback1<IPost>;
  isLoader: boolean;
  userProfile: IUser;
  selectedHash: string;
  fetchWorkspaceChats: IBindingCallback1<IFetchWorkspaceChat>;
  fetchUnreadUserPosts: IBindingCallback1<string>;
  fetchUnreadUserComments: IBindingCallback1<string>;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  selectWorkspace,
  showRightSideMenu,
  toggleRightMenu,
  isLoader,
  userProfile,
  selectedHash,
  fetchWorkspaceChats,
  fetchUnreadUserPosts,
  fetchUnreadUserComments
}) => {
  if (!currentUserId) return <></>;
  const [workspaceChatsStatus, setWorkspaceChatsStatus] = useState(false);
  const [fetchUnreadCommentsStatus, setFetchUnreadCommentsStatus] = useState(false);
  useEffect(() => {
    const { whash } = match.params;
    if (selectedHash !== whash) {
      const currWorkspace = userWorkspaces.find(workspaceItem => workspaceItem.hash === whash);
      if (currWorkspace) {
        selectWorkspace(currWorkspace);
        fetchWorkspaceChats({ workspaceId: currWorkspace.id });
        setWorkspaceChatsStatus(true);
      }
    }
  }, [match]);

  useEffect(() => {
    if (workspaceChatsStatus) {
      fetchUnreadUserPosts(currentUserId);
      setFetchUnreadCommentsStatus(true);
    }
  }, [workspaceChatsStatus]);

  useEffect(() => {
    if (fetchUnreadCommentsStatus) {
      fetchUnreadUserComments(currentUserId);
    }
  }, [fetchUnreadCommentsStatus]);

  const hideRightMenu = () => {
    toggleRightMenu(RightMenuTypes.None);
  };

  const renderProfile = () => (
    <ProfileOverview
      user={userProfile}
      hideRightMenu={hideRightMenu}
    />
  );

  const renderThread = () => <Thread onHide={hideRightMenu} />;

  const renderRightMenu = () => {
    switch (showRightSideMenu) {
      case RightMenuTypes.Profile:
        return renderProfile();
      case RightMenuTypes.Thread:
        return renderThread();
      default:
        return null;
    }
  };

  return (
    <LoaderWrapper loading={isLoader}>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.contentContainer}>
          <WorkspaceToolbar />

          <div className={styles.workspaceViewContainer}>

            <div className={styles.leftPanelWrapper}>
              <ChatToolbar currentUserId={currentUserId} />
            </div>
            <div className={styles.chatWrapper}>
              <Switch>
                <Route path={Routes.Drafts} component={DraftsContainer} />
                <Route path={Routes.Threads} component={ThreadsContainer} />
                <Route path={Routes.Post} component={ChatScene} />
                <Route path={Routes.Chat} component={ChatScene} />
                <Route component={NoChatMessage} />
              </Switch>
            </div>

            {showRightSideMenu
              ? (
                <div className={styles.rightPanelWrapper}>
                  {renderRightMenu()}
                </div>
              ) : null}
          </div>

        </div>
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.user;
  const id = user ? user.id : '';
  const { showRightSideMenu, workspace } = state.workspace;
  const activeThreadPostId = state.workspace.activeThread?.post.id;
  return {
    currentUserId: id,
    userWorkspaces: state.user.workspaceList,
    showRightSideMenu,
    activeThreadPostId,
    isLoader: !workspace.id,
    selectedHash: workspace.hash,
    userProfile: state.workspace.userProfile
  };
};

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine,
  toggleActiveThread: setActiveThreadRoutine,
  toggleRightMenu: showRightSideMenuRoutine,
  fetchWorkspaceChats: fetchWorkspaceChatsRoutine,
  fetchUnreadUserPosts: fetchUnreadUserPostsRoutine,
  fetchUnreadUserComments: fetchUnreadUserCommentsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
