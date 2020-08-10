import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction } from '../../common/models/callback/IBindingActions';
import { IAppState } from '../../common/models/store';
import { Routes } from '../../common/enums/Routes';
import { getAccessToken } from '../../common/helpers/storageHelper';
import LoaderWrapper from '../../components/LoaderWrapper';
import Header from '../Header';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { fetchUserRoutine } from '../../routines/user';
import AddWorkspace from '../../scenes/Workspace/Workspace';
import Auth from '../../scenes/Auth/containers/Auth';

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

  const mainMock = () => <div>Main</div>;

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      {isAuthorized
        ? <Header />
        : null}
      <Switch>
        <PublicRoute path={Routes.Auth} component={Auth} />
        <PrivateRoute exact path="/" component={mainMock} />
        <PrivateRoute exact path="/add-workspace" component={AddWorkspace} />
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
