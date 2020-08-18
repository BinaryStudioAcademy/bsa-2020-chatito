import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { Routine } from 'redux-saga-routines';
import Header from '../Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
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
import { setCurrentChatRoutine } from 'scenes/Chat/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import { IChat } from 'common/models/chat/IChat';
import { Route, Switch } from 'react-router-dom';

interface IProps {
  currentUserId?: string;
  match: {
    params: {
      whash: string;
      chash: string;
      subPage: string;
    };
  };
  userWorkspaces: IWorkspace[];
  router: (route: Routes | string) => void;
  selectWorkspace: (workspace: IWorkspace) => void;
  showRightSideMenu: RightMenuTypes;
  toggleRightMenu: IBindingCallback1<RightMenuTypes>;
  showUserProfile: IBindingCallback1<IUser>;
  toggleActiveThread: IBindingCallback1<IPost>;
  chats: IChat[];
  selectChat: Routine;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  router,
  selectWorkspace,
  showRightSideMenu,
  showUserProfile,
  toggleRightMenu,
  chats,
  selectChat
}) => {
  if (!currentUserId) return <></>;
  const [userData, setUserData] = useState<IUser | {}>({});

  useEffect(() => {
    const { whash, chash } = match.params;
    const currWorkspace = userWorkspaces.find(workspaceItem => workspaceItem.hash === whash);

    if (currWorkspace) {
      selectWorkspace(currWorkspace);
      if (chash) {
        const currChat = chats.find(chatItem => chatItem.hash === chash);
        if (currChat) selectChat(currChat);
      }
    } else {
      // case error with workspace
      // router(Routes.NotExistingPath);
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
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <WorkspaceToolbar />

        <div className={styles.workspaceViewContainer}>

          <div className={styles.leftPanelWrapper}>
            <ChatToolbar match={match} />
          </div>
          <div className={styles.chatWrapper}>
            <Switch>
              <Route path={Routes.Drafts} component={DraftsContainer} />
              <Route path={Routes.Threads} component={ThreadsContainer} />
              <Route component={ChatScene} />
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
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.user;
  const id = user ? user.id : '';
  const { showRightSideMenu } = state.workspace;
  const channels = state.workspace.channels || [];
  const directs = state.workspace.directMessages || [];
  const activeThreadPostId = state.workspace.activeThread?.post.id;
  return {
    currentUserId: id,
    userWorkspaces: state.user.workspaceList,
    showRightSideMenu,
    activeThreadPostId,
    chats: [...channels, ...directs] as IChat[]
  };
};

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine,
  toggleActiveThread: setActiveThreadRoutine,
  toggleRightMenu: showRightSideMenuRoutine,
  showUserProfile: showUserProfileRoutine,
  selectChat: setCurrentChatRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
