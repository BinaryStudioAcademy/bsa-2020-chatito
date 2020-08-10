import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IAppState } from 'common/models/store';

interface IProps {
  component: React.FC<any>;
  isAuthorized: boolean;
  [rest: string]: any;
}

const PublicRoute: React.FC<IProps> = ({
  component: Component,
  isAuthorized,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isAuthorized
        ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        : <Component {...props} />
    )}
  />
);

const mapStateToProps = (state: IAppState) => {
  const { user: { isAuthorized } } = state;
  return {
    isAuthorized
  };
};

export default connect(mapStateToProps)(PublicRoute);
