import React from 'react';
import { history } from '../../../../common/helpers/historyHelper';
import { Button } from 'react-bootstrap';

const SignUp = () => (
  <div>
    Sign Up
    <Button onClick={() => history.push('/auth/signin')}>sign up</Button>
  </div>
);

export default SignUp;
