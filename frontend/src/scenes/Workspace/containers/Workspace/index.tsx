import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import Header from '../Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
import ProfileOverview from 'components/ProfileOverview';
import { IUser } from 'common/models/user/IUser';
import { IAppState } from 'common/models/store';
import ChatScene from 'scenes/Chat';
import ChatToolbar from '../ChatToolbar';
import Thread from 'scenes/Workspace/containers/Thread';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { selectWorkspaceRoutine,
  setActiveThreadRoutine,
  showRightSideMenuRoutine,
  showUserProfileRoutine
} from 'scenes/Workspace/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import { RightMenuTypes } from 'common/enums/RightMenuTypes';
import ThreadsContainer from 'containers/ThreadsContainer/index';

interface IProps {
  currentUserId?: string;
  match: {
    params: {
      hash: string;
    };
  };
  userWorkspaces: IWorkspace[];
  router: (route: Routes) => void;
  selectWorkspace: (workspace: IWorkspace) => void;
  showRightSideMenu: RightMenuTypes;
  toggleRightMenu: IBindingCallback1<RightMenuTypes>;
  showUserProfile: IBindingCallback1<IUser>;
  toggleActiveThread: IBindingCallback1<IPost>;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  router,
  selectWorkspace,
  showRightSideMenu,
  showUserProfile,
  toggleRightMenu
}) => {
  if (!currentUserId) return <></>;
  const [userData, setUserData] = useState<IUser | {}>({});

  useEffect(() => {
    const { hash } = match.params;
    const currWorkspace = userWorkspaces.find(workspaceItem => workspaceItem.hash === hash);
    if (currWorkspace) {
      selectWorkspace(currWorkspace);
    } else {
      router(Routes.BaseUrl);
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
            <ChatToolbar />
          </div>

          <div className={styles.chatWrapper}>
            {/* <ChatScene /> */}
            <ThreadsContainer />
          </div>
          {showRightSideMenu
            ? (
              <div className={styles.rightPanelWrapper}>
                {renderRightMenu()}
              </div>
            ) : null }
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.user;
  const id = user ? user.id : '';
  const { showRightSideMenu } = state.workspace;
  const activeThreadPostId = state.workspace.activeThread?.post.id;
  return {
    currentUserId: id,
    userWorkspaces: state.user.workspaceList,
    showRightSideMenu,
    activeThreadPostId
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
