import React, { useState, useEffect } from 'react';
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
  showRightSideMenuRoutine,
  showUserProfileRoutine
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
  showUserProfile: IBindingCallback1<IUser>;
  toggleActiveThread: IBindingCallback1<IPost>;
  isLoader: boolean;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  selectWorkspace,
  showRightSideMenu,
  showUserProfile,
  toggleRightMenu,
  isLoader
}) => {
  if (!currentUserId) return <></>;
  const [userData, setUserData] = useState<IUser | {}>({});

  useEffect(() => {
    const { whash } = match.params;
    const currWorkspace = userWorkspaces.find(workspaceItem => workspaceItem.hash === whash);

    if (currWorkspace) {
      selectWorkspace(currWorkspace);
    }
  }, [match]);

  const setShowProfileHandler = (user: IUser) => {
    showUserProfile(user);
  };

  const hideRightMenu = () => {
    toggleRightMenu(RightMenuTypes.None);
  };

  const setUserDataHandler = (user: IUser | {}) => {
    setUserData(user);
  };

  const renderProfile = () => (
    <ProfileOverview
      user={userData as IUser}
      currentUserId={currentUserId}
      setShowProfileHandler={hideRightMenu}
      setUserDataHandler={setUserDataHandler}
    />
  );

  const renderThread = () => <Thread onHide={hideRightMenu} openUserProfile={setShowProfileHandler} />;

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
    // eslint-disable-next-line
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
    isLoader: !workspace.id
  };
};

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine,
  toggleActiveThread: setActiveThreadRoutine,
  toggleRightMenu: showRightSideMenuRoutine,
  showUserProfile: showUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
