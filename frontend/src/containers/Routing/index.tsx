import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingAction, IBindingCallback1 } from '../../common/models/callback';
import { IAppState } from '../../common/models/store';
import { Routes } from '../../common/enums/Routes';
import { getAccessToken } from '../../common/helpers/storageHelper';
import LoaderWrapper from '../../components/LoaderWrapper';
import Header from '../Header';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { fetchUserRoutine } from '../../routines/user';
import AddWorkspace from '../../scenes/Workspace/Workspace';

import CreateChannelModal from '../CreateChannelModal';
import { showModalRoutine } from '../../routines/modal';
import { ModalTypes } from '../../common/enums/ModalTypes';

interface IProps {
  isLoading: boolean;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
  toggleModal: IBindingCallback1<any>;
}

const Routing: React.FC<IProps> = ({
  isLoading,
  isAuthorized,
  fetchUser,
  toggleModal
}) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  });
  const handleOpenModal = () => {
    toggleModal({ modalType: ModalTypes.CreateChannel, show: true });
  };
  const signInMock = () => <div>Sign In</div>;
  const mainMock = () => <div>Main</div>;
  const btn = () => (
    <>
      <button type="button" onClick={handleOpenModal}>Toggle </button>
      <CreateChannelModal />
    </>
  );
  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Header />
      <Switch>
        <PublicRoute exact path={Routes.SignIn} component={btn} />
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
  fetchUser: fetchUserRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
