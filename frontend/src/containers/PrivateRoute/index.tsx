import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IAppState } from '../../common/models/store';
import { Routes } from '../../common/enums/Routes';
import Header from '../Header';

interface IProps {
  component: React.FC<any>;
  isAuthorized: boolean;
  [rest: string]: any;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  isAuthorized,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      !isAuthorized
        ? <Redirect to={{ pathname: Routes.SignIn, state: { from: props.location } }} />
        : (
          <>
            <Header />
            <Component {...props} />
          </>
        )
    )}
  />
);

const mapStateToProps = (state: IAppState) => {
  const { user: { isAuthorized } } = state;
  return {
    isAuthorized
  };
};

export default connect(mapStateToProps)(PrivateRoute);
