import React, { useState, createContext } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';

import Header from '../Header';
import WorkspaceToolbar from '../WorkspaceToolbar';
import ChatScene from '../../../Chat';
import ProfileOverview from '../../../../components/ProfileOverview';
import { IUser } from '../../../../common/models/user/IUser';
import { IAppState } from '../../../../common/models/store';

export interface IContext {
  setShowProfileHandler: () => void;
  setUserDataHandler: (user: IUser | {}) => void;
}

export const ProfileContext = createContext<IContext | {}>({});

interface IProps {
  currentUserId: string;
}

const Workspace: React.FC<IProps> = ({ currentUserId }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<IUser | {}>({});

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
            <div style={{ background: '#cbcbdc', height: '100%' }}>Left side chats toolbar</div>
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
  currentUserId: state.user.user
});

export default connect(mapStateToProps, null)(Workspace);
