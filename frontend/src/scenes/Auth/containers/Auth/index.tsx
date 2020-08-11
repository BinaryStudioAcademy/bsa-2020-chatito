import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import ForgotPassword from '../../components/ForgotPassword';
import ResetPassword from '../../components/ResetPassword';
import { ReactComponent as Mascot } from 'img/chatitoMascot.svg';
import { ReactComponent as Logo } from 'img/logo.svg';
import { Routes } from 'common/enums/Routes';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ILoginUser } from 'common/models/auth/ILoginUser';
import { IRegisterUser } from 'common/models/auth/IRegisterUser';
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';
import { IResetPasswordInput } from 'common/models/auth/IResetPasswordInput';
import {
  loginUserRoutine,
  addNewUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from 'routines/user';

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  addNewUser: IBindingCallback1<IRegisterUser>;
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
  resetPassword: IBindingCallback1<IResetPasswordInput>;
}

const Auth = ({
  loginUser,
  addNewUser,
  forgotPassword,
  resetPassword }: IProps) => (
    <div className={styles.pageLayout}>
      <div className={styles.leftSide}>
        <Mascot className={styles.mascot} />
        <Logo className={styles.logo} />
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
          render={props => <ForgotPassword {...props} forgotPassword={forgotPassword} />}
          key={Routes.ForgotPassword}
        />
        <Route
          exact
          path={Routes.ResetPassword}
          render={props => <ResetPassword {...props} resetPassword={resetPassword} />}
          key={Routes.ResetPassword}
        />
      </div>
    </div>
);

const mapDispatchToProps = {
  loginUser: loginUserRoutine,
  addNewUser: addNewUserRoutine,
  forgotPassword: forgotPasswordRoutine,
  resetPassword: resetPasswordRoutine
};

export default connect(null, mapDispatchToProps)(Auth);