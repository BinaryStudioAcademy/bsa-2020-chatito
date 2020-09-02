import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IAppState } from 'common/models/store';
import { Routes } from 'common/enums/Routes';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  component: React.FC<any>;
  workspaces: IWorkspace[];
  isAuthorized: boolean;
  [rest: string]: any;
}

const PublicRoute: React.FC<IProps> = ({
  component: Component,
  isAuthorized,
  workspaces,
  ...rest
}) => {
  const selectPathname = () => {
    if (workspaces[0]) {
      return Routes.Workspace.replace(':whash', workspaces[0].hash);
    }
    return Routes.AddWorkspace;
  };

  return (
    <Route
      {...rest}
      render={props => (
        isAuthorized
          ? (
            <Redirect
              to={{ pathname: selectPathname(), state: { from: props.location } }}
            />
          )
          : <Component {...props} />
      )}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { isAuthorized, workspaceList } } = state;
  return {
    isAuthorized,
    workspaces: workspaceList
  };
};

export default connect(mapStateToProps)(PublicRoute);
