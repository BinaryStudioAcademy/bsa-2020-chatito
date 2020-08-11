import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICheckInvitedUserRegistered } from 'common/models/inviteLink/ICheckInvitedUserRegistered';
import { checkInvitedUserRegisteredRoutine } from './routines';
import { IAppState } from 'common/models/store';
import { Routes } from 'common/enums/Routes';

interface IProps {
  checkInvitedUserRegistered: IBindingCallback1<ICheckInvitedUserRegistered>;
  invitedUserEmail?: string;
  match: {
    params: {
      token: string;
    };
  };
}

const JoinInvitedWorkspace = ({ match, invitedUserEmail, checkInvitedUserRegistered }: IProps) => {
  useLayoutEffect(() => {
    checkInvitedUserRegistered({ token: match.params.token });
  }, [match.params.token]);

  return (
    // TODO:
    invitedUserEmail ? <Redirect to={{ pathname: Routes.SignIn }} /> : <Redirect to={{ pathname: Routes.SignUp }} />
  );
};

const mapStateToProps = (state: IAppState) => ({
  invitedUserEmail: state.user.invitedUserEmail
});

const mapDispatchToProps = {
  checkInvitedUserRegistered: checkInvitedUserRegisteredRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinInvitedWorkspace);
