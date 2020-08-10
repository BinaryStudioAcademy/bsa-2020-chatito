import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction } from 'common/models/callback';
import { IAppState } from 'common/models/store';
import { Routes } from 'common/enums/Routes';
import { getAccessToken } from 'common/helpers/storageHelper';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { fetchUserRoutine } from 'routines/user';
import AddWorkspace from 'scenes/Workspace/containers/AddWorkspace';
import ForgotPassword from 'scenes/ForgotPassword';
import ResetPassword from 'scenes/ResetPassword';
import SignIn from 'scenes/SignIn';
import SignUp from 'scenes/SignUp';
import PageNotFound from 'scenes/PageNotFound/index';
import Workspace from 'scenes/Workspace/containers/Workspace';

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

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Switch>
        <PublicRoute exact path={Routes.SignIn} component={SignIn} />
        <PublicRoute exact path={Routes.SignUp} component={SignUp} />
        <PublicRoute exact path={Routes.ForgotPassword} component={ForgotPassword} />
        <PublicRoute exact path={Routes.ResetPassword} component={ResetPassword} />
        <PrivateRoute exact path={Routes.Workspace} component={Workspace} />
        <PrivateRoute exact path="/add-workspace" component={AddWorkspace} />
        <PublicRoute path={Routes.NotExistingPath} component={PageNotFound} />
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
