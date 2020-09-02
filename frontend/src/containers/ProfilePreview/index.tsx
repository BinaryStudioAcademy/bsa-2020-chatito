import React, { FunctionComponent } from 'react';
import { OverlayTrigger, Image, Popover } from 'react-bootstrap';
import { IUser } from 'common/models/user/IUser';
import styles from './styles.module.sass';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import ProfilePreviewContent from 'containers/ProfilePreviewContent';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';

interface IProps {
  tempUser: IUser;
  openProfile: IBindingCallback1<IUser>;
}

const ProfilePreview: FunctionComponent<IProps> = ({ tempUser, openProfile }) => {
  const popOver = (
    <Popover id={tempUser.id} className={styles.popOverWindow}>
      <ProfilePreviewContent tempUser={tempUser} openProfile={openProfile} />
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popOver}>
      <button
        type="button"
        className={styles.link}
      >
        <Image
          src={tempUser.imageUrl || userLogoDefaultUrl}
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

export default ProfilePreview;
