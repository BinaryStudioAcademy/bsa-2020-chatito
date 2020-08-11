import React, { useState, createContext, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { IBindingAction } from 'common/models/callback/IBindingActions';

import Header from '../Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
import ProfileOverview from 'components/ProfileOverview';
import { IUser } from 'common/models/user/IUser';
import { IChat } from 'common/models/chat/IChat';
import { IAppState } from 'common/models/store';
import ChatScene from 'scenes/Chat';
import ChatToolbar from '../ChatToolbar';
import { fetchChannelsRoutine } from '../../routines';

export interface IContext {
  setShowProfileHandler: () => void;
  setUserDataHandler: (user: IUser | {}) => void;
}

export const ProfileContext = createContext<IContext | {}>({});

interface IProps {
  currentUserId: string;
  fetchChats: IBindingAction;
}

const Workspace: React.FC<IProps> = ({ currentUserId, fetchChats }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<IUser | {}>({});

  const setShowProfileHandler = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    fetchChats();
  }, []);

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

const mapStateToProps = (state: IAppState) => ({
  currentUserId: state.user.user!.id
});

const mapDispatchToProps = {
  fetchChats: fetchChannelsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
