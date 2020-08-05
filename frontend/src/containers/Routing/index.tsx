import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction } from '../../common/models/callback';
import { IAppState } from '../../common/models/store';
import { Routes } from '../../common/enums/Routes';
import { getAccessToken } from '../../common/helpers/tokenHelper';
import LoaderWrapper from '../../components/LoaderWrapper';
import Header from '../Header';
import { fetchUserRoutine } from '../../routines/user';

interface IProps {
  loading: boolean;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
}

const Routing: React.FC<IProps> = ({
  loading,
  isAuthorized,
  fetchUser
}) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !loading) {
      fetchUser();
    }
  });

  const signInMock = () => <div>Sign In</div>;

  return (
    <LoaderWrapper loading={loading || (hasToken && !isAuthorized)}>
      <Header />
      <Switch>
        <Route path={Routes.SignIn} component={signInMock} />
      </Switch>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { loading, isAuthorized } } = state;
  return {
    loading,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
