import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import Header from '../Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
import NoChatMessage from '../NoChatMessage';
import ProfileOverview from 'components/ProfileOverview';
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
  showRightSideMenuRoutine
} from 'scenes/Workspace/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';

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
  selectedHash
}) => {
  if (!currentUserId) return <></>;

  useEffect(() => {
    const { whash } = match.params;
    if (selectedHash !== whash) {
      const currWorkspace = userWorkspaces.find(workspaceItem => workspaceItem.hash === whash);
      if (currWorkspace) {
        selectWorkspace(currWorkspace);
      }
    }
  }, [match]);

  const hideRightMenu = () => {
    toggleRightMenu(RightMenuTypes.None);
  };

  const renderProfile = () => (
    <ProfileOverview
      user={userProfile}
      currentUserId={currentUserId}
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
  toggleRightMenu: showRightSideMenuRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
