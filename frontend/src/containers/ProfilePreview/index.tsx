import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { OverlayTrigger, Image, Popover } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import styles from './styles.module.sass';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import ProfilePreviewContent from 'containers/ProfilePreviewContent';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IAppState } from 'common/models/store';

interface IProps {
  tempUser: IUser;
  openProfile: IBindingCallback1<IUser>;
  currentUser?: IUser;
}

const ProfilePreview: FunctionComponent<IProps> = ({ tempUser, openProfile, currentUser }) => {
  const popOver = (
    <Popover id={tempUser.id} className={styles.popOverWindow}>
      <ProfilePreviewContent tempUser={tempUser} openProfile={openProfile} />
    </Popover>
  );
  const imageUrl = tempUser.id === currentUser?.id ? currentUser?.imageUrl : tempUser.imageUrl;
  return (
    <OverlayTrigger trigger="click" rootClose placement="auto" overlay={popOver}>
      <button
        type="button"
        className={styles.link}
      >
        <Image
          src={imageUrl || userLogoDefaultUrl}
          style={{ objectFit: 'cover' }}
          width={40}
          height={40}
          className="rounded"
          alt={tempUser.fullName}
          roundedCircle
        />
      </button>
    </OverlayTrigger>
  );
};

const mapStateToProps = (state: IAppState) => ({
  currentUser: state.user.user as IUser
});

export default connect(mapStateToProps, null)(ProfilePreview);
