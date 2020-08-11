import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICheckInvitedUserRegistered } from 'common/models/inviteLink/ICheckInvitedUserRegistered';
import { checkInvitedUserRegisteredRoutine } from './routines';

interface IProps {
  checkInvitedUserRegistered: IBindingCallback1<ICheckInvitedUserRegistered>;
  match: {
    params: {
      token: string;
    };
  };
}

const JoinInvitedWorkspace = ({ match, checkInvitedUserRegistered }: IProps) => {
  useLayoutEffect(() => {
    checkInvitedUserRegistered({ token: match.params.token });
  }, [match.params.token]);

  return (
    <>
    </>
  );
};

const mapDispatchToProps = {
  checkInvitedUserRegistered: checkInvitedUserRegisteredRoutine
};

export default connect(null, mapDispatchToProps)(JoinInvitedWorkspace);
