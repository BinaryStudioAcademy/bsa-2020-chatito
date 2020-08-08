import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../../../components/InputField/InputField';
import { signInValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { IUserInput } from '../../../../common/models/auth/auth';
import { fetchUserRoutine } from '../../../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Routes } from '../../../../common/enums/Routes';
import { Link } from 'react-router-dom';

interface IProps {
  loginUser: (payload: IUserInput) => void;
}

const SignIn: FunctionComponent<IProps> = ({ loginUser }) => {
  const onSubmit = async (
    values: IUserInput,
    { setSubmitting }: { setSubmitting: CallableFunction }
  ) => {
    const { email, password } = values;
    const payload = {
      email,
      password
    };
    loginUser(payload);
    setSubmitting(false);
  };
  const initialValues = {
    email: '',
    password: ''
  };

  // const onForgotPassword = () => {
  //   router(Routes.ForgotPassword);
  // };

  return (
    <div className={styles.signIn}>
      <h1 className={styles.header}>Welcome</h1>
      <p className={styles.secondaryText}>
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
            label="Email:"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
          <InputField
            label="Password:"
            name="password"
            type="password"
          />
          {/* <Button variant="link" size="sm" onClick={onForgotPassword}>
            Forgot password
          </Button> */}

          <div className="form-group">
            <Button type="submit" variant="primary">
              Sign In
            </Button>
            <Link to={Routes.SignUp}>
              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine,
  router: push
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
