/* eslint-disable */
import React from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import styles from './styles.module.sass';
import { Routes } from '../../../../common/enums/Routes';
import { Route } from 'react-router';
import Switch from 'react-bootstrap/esm/Switch';
import { connect } from 'react-redux';
import { loginUserRoutine } from '../../../../routines/user';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { IUserInput } from '../../../../common/models/auth/auth';
import { ReactComponent as Mascot} from './chatito-mascot.svg';
import { ReactComponent as Logo } from './logo.svg';

interface IProps {
  loginUser: IBindingCallback1<IUserInput>;
}

const Auth = ({ loginUser }: IProps) => {
  // const { url } = match;
  // const toRender = routes.find(route => route.route === url)

  // const cb = (payload: any) => console.log(payload);

  return (
    <div className={styles.pageLayout}>
      <div className={styles.leftSide}>
        <Mascot className={styles.mascot}/>
        <Logo className={styles.logo}/>
      </div>
      <div className={styles.rightSide}>
        {/* <Switch> */}
          <Route
            exact
            path={Routes.SignIn}
            render={props => <SignIn {...props} loginUser={loginUser} />}
            key={Routes.SignIn}
          />
          <Route
            exact
            path={Routes.SignUp}
            component={SignUp}
            key={Routes.SignUp}
          />
        {/* </Switch> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser: loginUserRoutine
}

export default connect(null, mapDispatchToProps)(Auth);
