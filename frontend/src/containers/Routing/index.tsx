import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  isLoading: boolean;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
}

const Routing: React.FC<IProps> = ({
  isLoading,
  isAuthorized,
  fetchUser
}) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  });

  const storageHandler = (event: StorageEvent) => {
    if (event.key === null) {
      window.location.href = Routes.SignIn;
    }
  };

  useEffect(() => {
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Switch>
        <Route exact path={Routes.JoinInvitedWorkspace} component={JoinInvitedWorkspace} />
        <PublicRoute path={Routes.Auth} component={Auth} />
        <PrivateRoute path={Routes.Workspace} component={Workspace} />
        <PrivateRoute exact path={Routes.AddWorkspace} component={AddWorkspace} />
        <PrivateRoute path={Routes.Maintenance} component={Maintenance} />
        <Redirect exact from={Routes.BaseUrl} to={Routes.SignIn} />
        <Route component={PageNotFound} />
      </Switch>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { isLoading, isAuthorized } } = state;
  return {
    isLoading,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
