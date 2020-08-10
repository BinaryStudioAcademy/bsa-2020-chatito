import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { getRefreshToken } from '../../common/helpers/storageHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { removeToken } from '../../services/authService';

export const Logout: FunctionComponent = () => {
  const onLogout = async () => {
    alert(getRefreshToken());
    await removeToken(getRefreshToken());
    alert('S');
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Button variant="light" onClick={onLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '24px' }} />
    </Button>
  );
};

export default Logout;
