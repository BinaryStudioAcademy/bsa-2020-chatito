import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './styles.module.sass';

import InputField from 'components/InputField/InputField';
import { signInValSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { ILoginUser } from 'common/models/auth/ILoginUser';
import { Routes } from 'common/enums/Routes';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ReactComponent as SignInGoogle } from 'img/signInGoogle.svg';
import { ReactComponent as SignInFacebook } from 'img/signInFacebook.svg';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { toastrError } from 'services/toastrService';
import { ILoginWithGoogle } from 'common/models/auth/ILoginWithGoogle';
import { googleAuthConfig } from 'config/googleAuthConfig';

declare const gapi: any;

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  loginWithGoogle: IBindingCallback1<ILoginWithGoogle>;
  workspace: IWorkspace;
  invitedUserEmail?: string;
}

const SignIn: FunctionComponent<IProps> = ({ loginUser, loginWithGoogle, workspace, invitedUserEmail }) => {
  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init(googleAuthConfig);
    });
  });

  const onSubmit = (values: ILoginUser) => {
    const { email, password } = values;
    const payload = {
      email,
      password,
      workspace
    };

    return (invitedUserEmail && email !== invitedUserEmail)
      ? toastrError('Please, use email which you where invited with.')
      : loginUser(payload);
  };

  const handleGoogleAuth = async () => {
    const auth2 = gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();

    const email = googleUser.getBasicProfile().getEmail();
    const token = googleUser.getAuthResponse().id_token;

    return (invitedUserEmail && email !== invitedUserEmail)
      ? toastrError('Please, use email which you where invited with.')
      : loginWithGoogle({ token, workspace });
  };

  const initialValues = {
    email: '',
    password: '',
    workspace
  };

  const invitationHeaderText = workspace.name ? ` to ${workspace.name}` : '';

  return (
    <div className={styles.signIn}>
      <header className={styles.signInHeader}>
        <h1 className={styles.header}>
          Welcome
          {invitationHeaderText}
        </h1>
        <p className={styles.signUpLink}>
          {'New here? '}
          <Link className={styles.authLink} to={Routes.SignUp}>Create an account</Link>
        </p>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={`${styles.inpBlock} signIn-form d-flex flex-column justify-content-center align-items-center`}>
          <div className={styles.inputContainer}>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="user@gmail.com"
            />
          </div>
          <div className={styles.inputContainer}>
            <InputField
              label="Password"
              name="password"
              type="password"
              link={Routes.ForgotPassword}
              linkDescription="Forgot password?"
              linkClassName={styles.forgotPasswordLink}
            />
          </div>
          <div className={`${styles.formFooter} w-100`}>
            <Button type="submit" variant="primary" className={styles.primaryBtn}>
              Sign In
            </Button>
            <div className={styles.socialSignInWrapper}>
              <span>Or Log in with</span>
              <button className={styles.socialSignIn} type="button" onClick={handleGoogleAuth}>
                <SignInGoogle />
              </button>
              <button className={styles.socialSignIn} type="button">
                <SignInFacebook />
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
