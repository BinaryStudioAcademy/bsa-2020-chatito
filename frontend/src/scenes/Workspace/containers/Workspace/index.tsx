import React, { useState, createContext, useEffect } from 'react';
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
import { selectWorkspaceRoutine, setActiveThreadRoutine } from 'scenes/Workspace/routines';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IPost } from 'common/models/post/IPost';
import ThreadsContainer from 'containers/ThreadsContainer';

export interface IContext {
  setShowProfileHandler: () => void;
  setUserDataHandler: (user: IUser | {}) => void;
  showThreadHandler: IBindingCallback1<IPost>;
}

export const ProfileContext = createContext<IContext | {}>({});

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
  toggleActiveThread: IBindingCallback1<IPost>;
}

const Workspace: React.FC<IProps> = ({
  currentUserId,
  match,
  userWorkspaces,
  router,
  selectWorkspace,
  toggleActiveThread }) => {
  if (!currentUserId) return <></>;

  const [showProfile, setShowProfile] = useState(false);
  const [showThread, setShowThread] = useState(false);
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

  const setShowProfileHandler = () => {
    setShowProfile(!showProfile);
    setShowThread(false);
  };

  const showThreadHandler = (post: IPost) => {
    setShowThread(!showThread);
    setShowProfile(false);
    toggleActiveThread(post);
  };

  const hideThreadHandler = () => {
    setShowThread(false);
  };

  const setUserDataHandler = (user: IUser | {}) => {
    setUserData(user);
  };

  const renderProfile = () => (
    <ProfileOverview
      user={userData as IUser}
      currentUserId={currentUserId}
      setShowProfileHandler={setShowProfileHandler}
      setUserDataHandler={setUserDataHandler}
    />
  );

  const renderThread = () => <Thread onHide={hideThreadHandler} />;

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <WorkspaceToolbar />

        <div className={styles.workspaceViewContainer}>

          <div className={styles.LeftPanelWrapper}>
            <ChatToolbar />
          </div>

          <div className={styles.ChatWrapper}>
            {/* rename Profile context, as it passing thread context too */}
            <ProfileContext.Provider
              value={{
                setShowProfileHandler,
                setUserDataHandler,
                showThreadHandler
              }}
            >
              {/* <ChatScene /> */}
              <ThreadsContainer />
            </ProfileContext.Provider>
          </div>

          <div className={styles.RightPanelWrapper}>
            {showProfile && renderProfile()}
            {showThread && renderThread()}
          </div>

        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  currentUserId: state.user.user?.id,
  userWorkspaces: state.user.workspaceList
});

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine,
  toggleActiveThread: setActiveThreadRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
