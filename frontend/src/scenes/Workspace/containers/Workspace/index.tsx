import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import Header from 'containers/Header';
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
import ChannelBrowser from 'scenes/ChannelBrowser';
import ChangeStatusModal from 'containers/ChangeStatusModal';
import { IFetchWorkspaceUnreadComments } from 'common/models/post/IFetchWorkspaceUnreadComments';
import { IFetchWorkspaceUnreadPosts } from 'common/models/post/IFetchWorkspaceUnreadPosts';
import { renderScrollDownButtonRoutine, clickToScrollRoutine } from 'scenes/Chat/routines';

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
  scrollDownButton: boolean;
  workspaceId: string;
  userProfile: IUser;
  selectedHash: string;
  fetchWorkspaceChats: IBindingCallback1<IFetchWorkspaceChat>;
  fetchUnreadUserPosts: IBindingCallback1<IFetchWorkspaceUnreadPosts>;
  fetchUnreadUserComments: IBindingCallback1<IFetchWorkspaceUnreadComments>;
  renderScrollDownButton: IBindingCallback1<boolean>;
  clickToScrol: IBindingCallback1<boolean>;
  pathName: string;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  selectWorkspace,
  showRightSideMenu,
  toggleRightMenu,
  isLoader,
  scrollDownButton,
  workspaceId,
  userProfile,
  selectedHash,
  fetchWorkspaceChats,
  fetchUnreadUserPosts,
  fetchUnreadUserComments,
  renderScrollDownButton,
  clickToScrol,
  pathName
}) => {
  if (!currentUserId) return <></>;
  const [workspaceChatsStatus, setWorkspaceChatsStatus] = useState(false);
  const [fetchUnreadCommentsStatus, setFetchUnreadCommentsStatus] = useState(false);

  useEffect(() => {
    renderScrollDownButton(false);
  }, [pathName]);

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
      fetchUnreadUserPosts({ wpId: workspaceId, userId: currentUserId });
      setFetchUnreadCommentsStatus(true);
      setWorkspaceChatsStatus(false);
    }
  }, [workspaceChatsStatus]);

  useEffect(() => {
    if (fetchUnreadCommentsStatus) {
      fetchUnreadUserComments({ wpId: workspaceId, userId: currentUserId });
      setFetchUnreadCommentsStatus(false);
    }
  }, [fetchUnreadCommentsStatus]);

  const hideRightMenu = () => {
    toggleRightMenu(RightMenuTypes.None);
  };

  const renderProfile = () => (
    <ProfileOverview
      tempUser={userProfile}
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
              <ChatToolbar />
            </div>
            <div className={styles.chatWrapper}>
              <Switch>
                <Route path={Routes.Drafts} component={DraftsContainer} />
                <Route path={Routes.Threads} component={ThreadsContainer} />
                <Route path={Routes.ChannelBrowser} component={ChannelBrowser} />
                <Route path={Routes.Post} component={ChatScene} />
                <Route path={Routes.Chat} component={ChatScene} />
                <Route component={NoChatMessage} />
              </Switch>
              {scrollDownButton ? (
                <div className={styles.goToNewPostContainer}>
                  <button
                    type="button"
                    className={`${styles.goToNewPost} button-unstyled`}
                    onClick={() => {
                      clickToScrol(true);
                      renderScrollDownButton(false);
                    }}
                  >
                    <span className={styles.goDownButtonText}>Go down</span>
                  </button>
                </div>
              ) : (
                ''
              )}
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
      <ChangeStatusModal />
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
    userProfile: state.workspace.userProfile,
    workspaceId: workspace.id,
    scrollDownButton: state.chat.scrollDownButton,
    pathName: state.router.location.pathname
  };
};

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine,
  toggleActiveThread: setActiveThreadRoutine,
  toggleRightMenu: showRightSideMenuRoutine,
  fetchWorkspaceChats: fetchWorkspaceChatsRoutine,
  fetchUnreadUserPosts: fetchUnreadUserPostsRoutine,
  fetchUnreadUserComments: fetchUnreadUserCommentsRoutine,
  renderScrollDownButton: renderScrollDownButtonRoutine,
  clickToScrol: clickToScrollRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
