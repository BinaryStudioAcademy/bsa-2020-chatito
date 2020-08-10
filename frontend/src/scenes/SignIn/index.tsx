import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../components/InputField/InputField';
import { signInValSchema as validationSchema } from '../../common/models/formik/ValidationSchemas';
import { loginUserRoutine } from '../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { ILoginUser } from '../../common/models/auth/ILoginUser';
import { Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Routes } from '../../common/enums/Routes';

interface IProps {
  loginUser: Routine;
  router: (route: string) => void;
}

const SignIn: FunctionComponent<IProps> = ({ loginUser, router }) => {
  const onSubmit = async (values: ILoginUser) => {
    const { email, password } = values;
    const payload = { email, password };
    loginUser(payload);
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
      <h1 className={`text-center ${styles.signInHeader}`}>Sign in</h1>
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
          <Button variant="link" size="sm" onClick={onForgotPassword}>
            Forgot password
          </Button>

          <div className="form-group">
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser: loginUserRoutine,
  router: push
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
