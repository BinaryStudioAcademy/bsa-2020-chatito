import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { Button } from 'react-bootstrap';
import { history } from '../../common/helpers/historyHelper';
import { Routes } from '../../common/enums/Routes';
import { logoutUserRoutine } from '../../routines/user';
import { ITokens } from '../../common/models/ITokens';
import { setTokens, getRefreshToken } from '../../common/helpers/storageHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../services/authService';

interface IProps {
  logoutUser: Routine;
}

export const Logout: FunctionComponent<IProps> = ({ logoutUser }) => {
  const onLogout = () => {
    logout(getRefreshToken());
    const tokens: ITokens = { accessToken: '', refreshToken: '' };
    setTokens(tokens);
    logoutUser();
    history.push(Routes.SignIn);
  };
  return (
    <Button variant="light" onClick={onLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '24px' }} />
    </Button>
  );
};

const mapDispatchToProps = {
  logoutUser: logoutUserRoutine
};

export default connect(null, mapDispatchToProps)(Logout);
