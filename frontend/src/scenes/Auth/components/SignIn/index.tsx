import React, { FunctionComponent } from 'react';
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

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  workspace: IWorkspace;
}

const SignIn: FunctionComponent<IProps> = ({ loginUser, workspace }) => {
  const onSubmit = (values: ILoginUser) => {
    const { email, password } = values;
    const payload = {
      email,
      password,
      workspace
    };
    loginUser(payload);
  };
  const initialValues = {
    email: '',
    password: '',
    workspace
  };

  return (
    <div className={styles.signIn}>
      <h1 className={styles.header}>Welcome</h1>
      <p className={styles.signUpLink}>
        {'New here? '}
        <Link className={styles.authLink} to={Routes.SignUp}>Create an account</Link>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signIn-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="user@gmail.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            link={Routes.ForgotPassword}
            linkDescription="Forgot password?"
            linkClassName={styles.forgotPasswordLink}
          />
          <div className={`${styles.formFooter} mt-4 w-100`}>
            <Button type="submit" variant="primary" className={styles.primaryBtn}>
              Sign In
            </Button>
            <div className={styles.socialSignInWrapper}>
              <span>Or Log in with</span>
              <button className={styles.socialSignIn} type="button">
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
