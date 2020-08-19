import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IAppState } from 'common/models/store';
import { Routes } from 'common/enums/Routes';
import { getAccessToken } from 'common/helpers/storageHelper';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { fetchUserRoutine } from 'routines/user';
import AddWorkspace from 'scenes/Workspace/containers/AddWorkspace';
import PageNotFound from 'scenes/PageNotFound/index';
import Maintenance from 'containers/Maintenance';
import Workspace from 'scenes/Workspace/containers/Workspace';
import Auth from 'scenes/Auth/containers/Auth';
import JoinInvitedWorkspace from 'containers/JoinInvitedWorkspace';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IFetchUser } from 'common/models/fetch/IFetchUser';
import CustomReminderForm from 'containers/CustomReminderForm';

interface IProps {
  isLoading: boolean;
  isAuthorized: boolean;
  workspace: IWorkspace;
  fetchUser: IBindingCallback1<IFetchUser>;
}

const Routing: React.FC<IProps> = ({
  isLoading,
  isAuthorized,
  workspace,
  fetchUser
}) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      const payload = {
        workspace
      };
      fetchUser(payload);
    }
  });

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Switch>
        <Route exact path={Routes.JoinInvitedWorkspace} component={JoinInvitedWorkspace} />
        <PublicRoute path={Routes.Auth} component={Auth} />
        <PrivateRoute path={Routes.Workspace} component={Workspace} />
        <PrivateRoute exact path={Routes.AddWorkspace} component={AddWorkspace} />
        <PrivateRoute path={Routes.Maintenance} component={Maintenance} />
        <Redirect exact from={Routes.BaseUrl} to={Routes.SignIn} />
        <Route component={CustomReminderForm} />
      </Switch>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { isLoading, isAuthorized }, workspace } = state;
  return {
    isLoading,
    isAuthorized,
    workspace: workspace.workspace
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
