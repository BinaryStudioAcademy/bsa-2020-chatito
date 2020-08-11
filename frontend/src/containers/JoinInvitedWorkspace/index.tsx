import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICheckInvitedUserRegistered } from 'common/models/inviteLink/ICheckInvitedUserRegistered';
import { checkInvitedUserRegisteredRoutine } from './routines';

import SignIn from 'scenes/Auth/components/SignIn';
import SignUp from 'scenes/Auth/components/SignUp';

interface IProps {
  checkInvitedUserRegistered: IBindingCallback1<ICheckInvitedUserRegistered>;
  match: {
    params: {
      token: string;
    };
  };
}

const JoinInvitedWorkspace: FunctionComponent<IProps> = ({ match, checkInvitedUserRegistered }: IProps) => {
  const [isInvitedUserRegistered, setInvitedUserRegistered]: [boolean, Function] = useState(false);

  useEffect(() => {
    const response = checkInvitedUserRegistered({ token: match.params.token });
    setInvitedUserRegistered(response);
  });

  return (
    // eslint-disable-next-line
    isInvitedUserRegistered ? <SignUp addNewUser={() => {}} /> : <SignIn loginUser={() => {}} />
  );
};

const mapDispatchToProps = {
  checkInvitedUserRegistered: checkInvitedUserRegisteredRoutine
};

export default connect(null, mapDispatchToProps)(JoinInvitedWorkspace);
