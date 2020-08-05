import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction } from '../../common/models/callback';
import { Routes } from '../../common/enums/Routes';
import { getAccessToken } from '../../common/helpers/tokenHelper';
import LoaderSpinner from '../../components/Spinner/index';
import Header from '../Header';
import { fetchUserRoutine } from '../../scenes/Authorization/routines';

export interface IRoutingProps {
  loading: boolean;
  isAuthorized: boolean;
  fetchCurrentUser: IBindingAction;
}

const Routing: React.FC<IRoutingProps> = ({
  loading,
  isAuthorized,
  fetchCurrentUser
}) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !loading) {
      fetchCurrentUser();
    }
  });

  const mainMock = () => <div>Chatito main</div>;
  const signInMock = () => <div>Sign In</div>;
  const signUpMock = () => <div>Sign Up</div>;
  const workspaceMock = () => <div>workspace</div>;
  const profileMock = () => <div>profile</div>;
  const notFound = () => <div>not found</div>;

  return (
    <>
      <header>
        <Header />
      </header>
      {loading
        ? <LoaderSpinner />
        : (
          <Switch>
            <Route exact path="/" component={mainMock} />
            <Route exact path={Routes.SignIn} component={signInMock} />
            <Route exact path={Routes.SignUp} component={signUpMock} />
            <Route exact path={Routes.Workspace} component={workspaceMock} />
            <Route exact path={Routes.Profile} component={profileMock} />
            <Route path="*" component={notFound} />
          </Switch>
        )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { UserReducer: { loading, isAuthorized } } = state;
  return {
    loading,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchCurrentUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
