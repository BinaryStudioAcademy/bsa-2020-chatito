import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction } from '../../common/models/callback';
import { IAppState } from '../../common/models/store';
import { Routes } from '../../common/enums/Routes';
import { getAccessToken } from '../../common/helpers/storageHelper';
import LoaderWrapper from '../../components/LoaderWrapper';
import Header from '../Header';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { fetchUserRoutine } from '../../routines/user';
import AddWorkspace from '../../scenes/Workspace';

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

  const signInMock = () => <div>Sign In</div>;
  const mainMock = () => <div>Main</div>;

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Header />
      <AddWorkspace />
      <Switch>
        <PublicRoute exact path={Routes.SignIn} component={signInMock} />
        <PrivateRoute exact path="/" component={mainMock} />
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
