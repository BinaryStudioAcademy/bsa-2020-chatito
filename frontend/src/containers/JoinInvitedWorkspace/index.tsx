import React, { useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';

import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICheckInvitedUserRegistered } from 'common/models/inviteLink/ICheckInvitedUserRegistered';
import { checkInvitedUserRegisteredRoutine, addInviteWorkspaceRoutine } from './routines';
import { IAppState } from 'common/models/store';
import { Redirect } from 'react-router';
import { Routes } from 'common/enums/Routes';
import LoaderWrapper from 'components/LoaderWrapper';
import { IAddInviteWorkspace } from 'common/models/inviteLink/IAddInviteWorkspace';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  checkInvitedUserRegistered: IBindingCallback1<ICheckInvitedUserRegistered>;
  addInviteWorkspace: IBindingCallback1<IAddInviteWorkspace>;
  invitedUserRegistered?: boolean;
  loading: boolean;
  match: {
    params: {
      token: string;
    };
  };
  isAuthorized: boolean;
  workspace: IWorkspace;
}

const JoinInvitedWorkspace = ({
  match,
  invitedUserRegistered,
  checkInvitedUserRegistered,
  loading,
  isAuthorized,
  workspace,
  addInviteWorkspace
}: IProps) => {
  useLayoutEffect(() => {
    checkInvitedUserRegistered({ token: match.params.token });
  }, [match.params.token]);

  useEffect(() => {
    if (isAuthorized && workspace.id) {
      addInviteWorkspace({ workspaceId: workspace.id });
    }
  }, [workspace]);

  return (
    <>
      <LoaderWrapper loading={loading || invitedUserRegistered === undefined}>
        {invitedUserRegistered
          ? <Redirect to={{ pathname: Routes.SignIn }} />
          : <Redirect to={{ pathname: Routes.SignUp }} />}
      </LoaderWrapper>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user, inviteWorkspace, workspace } = state;
  return {
    invitedUserRegistered: user.invitedUserRegistered,
    loading: inviteWorkspace.loading,
    isAuthorized: user.isAuthorized,
    workspace: workspace.workspace
  };
};

const mapDispatchToProps = {
  checkInvitedUserRegistered: checkInvitedUserRegisteredRoutine,
  addInviteWorkspace: addInviteWorkspaceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinInvitedWorkspace);
