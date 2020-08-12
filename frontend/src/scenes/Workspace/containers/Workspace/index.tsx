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
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { selectWorkspaceRoutine } from 'scenes/Workspace/routines';

export interface IContext {
  setShowProfileHandler: () => void;
  setUserDataHandler: (user: IUser | {}) => void;
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
}

const Workspace: React.FC<IProps> = ({ currentUserId, match, userWorkspaces, router, selectWorkspace }) => {
  if (!currentUserId) return <></>;

  const [showProfile, setShowProfile] = useState(false);
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
            <ProfileContext.Provider value={{ setShowProfileHandler, setUserDataHandler }}>
              <ChatScene />
            </ProfileContext.Provider>
          </div>

          <div className={styles.RightPanelWrapper}>
            {showProfile && renderProfile()}
          </div>

        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.user;
  const id = user ? user.id : '';
  return {
    currentUserId: id,
    userWorkspaces: state.user.workspaceList
  };
};

const mapDispatchToProps = {
  router: push,
  selectWorkspace: selectWorkspaceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
