import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICheckInvitedUserRegistered } from 'common/models/inviteLink/ICheckInvitedUserRegistered';
import { checkInvitedUserRegisteredRoutine } from './routines';
import { IAppState } from 'common/models/store';
import { Redirect } from 'react-router';
import { Routes } from 'common/enums/Routes';
import LoaderWrapper from 'components/LoaderWrapper';

interface IProps {
  checkInvitedUserRegistered: IBindingCallback1<ICheckInvitedUserRegistered>;
  invitedUserRegistered?: boolean;
  loading: boolean;
  match: {
    params: {
      token: string;
    };
  };
}

const JoinInvitedWorkspace = ({ match, invitedUserRegistered, checkInvitedUserRegistered, loading }: IProps) => {
  useLayoutEffect(() => {
    checkInvitedUserRegistered({ token: match.params.token });
  }, [match.params.token]);

  return (
    <>
      <LoaderWrapper loading={loading}>
        {invitedUserRegistered
          ? <Redirect to={{ pathname: Routes.SignIn }} />
          : <Redirect to={{ pathname: Routes.SignUp }} />}
      </LoaderWrapper>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state;
  return {
    invitedUserRegistered: user.invitedUserRegistered,
    loading: state.inviteWorkspace.loading
  };
};

const mapDispatchToProps = {
  checkInvitedUserRegistered: checkInvitedUserRegisteredRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinInvitedWorkspace);
