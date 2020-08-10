/* eslint-disable */
import React from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import ForgotPassword from "../../components/ForgotPassword";
import ResetPassword from "../../components/ResetPassword";
import styles from './styles.module.sass';
import { Routes } from '../../../../common/enums/Routes';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { loginUserRoutine, addNewUserRoutine } from '../../../../routines/user';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { ILoginUser } from '../../../../common/models/auth/ILoginUser';
import { IRegisterUser } from '../../../../common/models/auth/IRegisterUser';
import { ReactComponent as Mascot} from '../../../../img/chatito-mascot.svg';
import { ReactComponent as Logo } from '../../../../img/logo.svg';

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  addNewUser: IBindingCallback1<IRegisterUser>;
}

const Auth = ({ loginUser, addNewUser }: IProps) => {


  return (
    <div className={styles.pageLayout}>
      <div className={styles.leftSide}>
        <Mascot className={styles.mascot}/>
        <Logo className={styles.logo}/>
      </div>
      <div className={styles.rightSide}>
          <Route
            exact
            path={Routes.SignIn}
            render={props => <SignIn {...props} loginUser={loginUser} />}
            key={Routes.SignIn}
          />
          <Route
            exact
            path={Routes.SignUp}
            render={props => <SignUp {...props} addNewUser={addNewUser} />}
            key={Routes.SignUp}
          />
          <Route
            exact
            path={Routes.ForgotPassword}
            component={ForgotPassword}
            key={Routes.ForgotPassword}
          />
          <Route
            exact
            path={Routes.ResetPassword}
            component={ResetPassword}
            key={Routes.ResetPassword}
          />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser: loginUserRoutine,
  addNewUser: addNewUserRoutine
}

export default connect(null, mapDispatchToProps)(Auth);
