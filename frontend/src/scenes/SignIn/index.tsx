import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../components/InputField/InputField';
import { signInValSchema as validationSchema } from '../../common/models/formik/ValidationSchemas';
import { IUserInput } from '../../common/models/auth/auth';
import { fetchUserRoutine } from '../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Routes } from '../../common/enums/Routes';

interface IProps {
  fetchUser: Routine;
  router: (route: string) => void;
}

const SignIn: FunctionComponent<IProps> = ({ fetchUser, router }) => {
  const onSubmit = async (values: IUserInput,
    { setSubmitting }: { setSubmitting: CallableFunction }) => {
    const { email, password } = values;
    const payload = {
      payload: { email, password }
    };
    fetchUser(payload);
    setSubmitting(false);
  };
  const initialValues = {
    email: '',
    password: ''
  };

  const onForgotPassword = () => {
    router(Routes.ForgotPassword);
  };

  return (
    <div className={styles.signIn}>
      <h1 className="text-center p-5">Sign in</h1>
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

          <div className="form-group">
            <Button type="submit" variant="primary">
              Sign In
            </Button>
            <Button variant="link" onClick={onForgotPassword}>
              Forgot password
            </Button>
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
